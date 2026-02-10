// Voice recording module
export interface VoiceRecording {
  id: string;
  audioUrl: string;
  transcription?: string;
  duration: number;
  createdAt: Date;
  promptId: string;
  userId: string;
}

export class VoiceRecorder {
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private stream: MediaStream | null = null;

  async startRecording(): Promise<void> {
    try {
      this.stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        }
      });

      this.mediaRecorder = new MediaRecorder(this.stream, {
        mimeType: 'audio/webm;codecs=opus'
      });

      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.start(1000);
    } catch (error) {
      console.error('Error starting recording:', error);
      throw new Error('Could not start recording. Please check microphone permissions.');
    }
  }

  async stopRecording(): Promise<Blob> {
    return new Promise((resolve, reject) => {
      if (!this.mediaRecorder) {
        reject(new Error('No recording in progress'));
        return;
      }

      this.mediaRecorder.onstop = () => {
        const audioBlob = new Blob(this.audioChunks, { type: 'audio/webm' });
        this.cleanup();
        resolve(audioBlob);
      };

      this.mediaRecorder.stop();
    });
  }

  private cleanup(): void {
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    this.mediaRecorder = null;
    this.audioChunks = [];
  }

  isRecording(): boolean {
    return this.mediaRecorder?.state === 'recording';
  }
}

export const uploadVoiceRecording = async (
  audioBlob: Blob,
  userId: string,
  promptId: string
): Promise<string> => {
  console.log('Voice upload not yet implemented - Supabase storage integration coming soon');
  throw new Error('Voice upload not yet configured. Please check back soon!');
};

export const transcribeAudio = async (audioUrl: string): Promise<string> => {
  console.log('Transcription not yet implemented');
  throw new Error('Audio transcription not yet configured. Please check back soon!');
};

export const generateVoiceClone = async (
  text: string,
  voiceSampleUrl: string
): Promise<string> => {
  console.log('Voice cloning not yet implemented');
  throw new Error('Voice cloning not yet configured. Please check back soon!');
};
