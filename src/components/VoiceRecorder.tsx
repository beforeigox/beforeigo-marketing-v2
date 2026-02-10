import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Play, Pause, Square, Upload } from 'lucide-react';
import { VoiceRecorder, uploadVoiceRecording, transcribeAudio } from '../lib/voice';

interface VoiceRecorderProps {
  onRecordingComplete: (audioUrl: string, transcription?: string) => void;
  userId: string;
  promptId: string;
  disabled?: boolean;
}

const VoiceRecorderComponent: React.FC<VoiceRecorderProps> = ({
  onRecordingComplete,
  userId,
  promptId,
  disabled = false
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  
  const voiceRecorder = useRef<VoiceRecorder>(new VoiceRecorder());
  const audioRef = useRef<HTMLAudioElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      await voiceRecorder.current.startRecording();
      setIsRecording(true);
      setRecordingTime(0);
      
      intervalRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } catch (error) {
      console.error('Failed to start recording:', error);
      alert('Could not start recording. Please check your microphone permissions.');
    }
  };

  const stopRecording = async () => {
    try {
      const blob = await voiceRecorder.current.stopRecording();
      setIsRecording(false);
      
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      
      setAudioBlob(blob);
      const url = URL.createObjectURL(blob);
      setAudioUrl(url);
    } catch (error) {
      console.error('Failed to stop recording:', error);
    }
  };

  const playRecording = () => {
    if (audioRef.current && audioUrl) {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const pauseRecording = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const uploadRecording = async () => {
    if (!audioBlob) return;
    
    setIsUploading(true);
    try {
      const uploadedUrl = await uploadVoiceRecording(audioBlob, userId, promptId);
      
      setIsTranscribing(true);
      let transcription: string | undefined;
      
      try {
        transcription = await transcribeAudio(uploadedUrl);
      } catch (error) {
        console.error('Transcription failed:', error);
        // Continue without transcription
      }
      
      setIsTranscribing(false);
      onRecordingComplete(uploadedUrl, transcription);
      
      // Reset state
      setAudioBlob(null);
      setAudioUrl(null);
      setRecordingTime(0);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Failed to upload recording. Please try again.');
    } finally {
      setIsUploading(false);
      setIsTranscribing(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (disabled) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
        <Mic className="h-8 w-8 text-slate-400 mx-auto mb-2" />
        <p className="text-slate-600 text-sm">Voice recording available in Premium and Legacy plans</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6">
      <div className="text-center">
        <h3 className="text-lg font-medium text-slate-900 mb-4">Voice Recording</h3>
        
        {/* Recording Controls */}
        <div className="flex justify-center items-center space-x-4 mb-4">
          {!isRecording && !audioBlob && (
            <button
              onClick={startRecording}
              className="flex items-center space-x-2 bg-rose-600 text-white px-6 py-3 rounded-lg hover:bg-rose-700 transition-colors"
            >
              <Mic className="h-5 w-5" />
              <span>Start Recording</span>
            </button>
          )}
          
          {isRecording && (
            <button
              onClick={stopRecording}
              className="flex items-center space-x-2 bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors animate-pulse"
            >
              <Square className="h-5 w-5" />
              <span>Stop Recording</span>
            </button>
          )}
          
          {audioBlob && !isRecording && (
            <div className="flex space-x-2">
              <button
                onClick={isPlaying ? pauseRecording : playRecording}
                className="flex items-center space-x-2 bg-slate-600 text-white px-4 py-2 rounded-lg hover:bg-slate-700 transition-colors"
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                <span>{isPlaying ? 'Pause' : 'Play'}</span>
              </button>
              
              <button
                onClick={uploadRecording}
                disabled={isUploading || isTranscribing}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Upload className="h-4 w-4" />
                <span>
                  {isUploading ? 'Uploading...' : isTranscribing ? 'Transcribing...' : 'Save Recording'}
                </span>
              </button>
            </div>
          )}
        </div>
        
        {/* Recording Time */}
        {(isRecording || recordingTime > 0) && (
          <div className="text-2xl font-mono text-slate-700 mb-4">
            {formatTime(recordingTime)}
          </div>
        )}
        
        {/* Audio Player */}
        {audioUrl && (
          <audio
            ref={audioRef}
            src={audioUrl}
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          />
        )}
        
        {/* Status Messages */}
        {isUploading && (
          <p className="text-blue-600 text-sm">Uploading your recording...</p>
        )}
        
        {isTranscribing && (
          <p className="text-purple-600 text-sm">Converting speech to text...</p>
        )}
      </div>
    </div>
  );
};

export default VoiceRecorderComponent;