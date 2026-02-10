import React, { useState } from 'react';
import { Save, Mic, Type, Sparkles } from 'lucide-react';
import VoiceRecorderComponent from './VoiceRecorder';

interface StoryPromptProps {
  prompt: {
    id: string;
    title: string;
    question: string;
    category: string;
  };
  userPlan: 'starter' | 'premium' | 'legacy';
  userId: string;
  onSave: (promptId: string, content: string, audioUrl?: string) => void;
}

const StoryPrompt: React.FC<StoryPromptProps> = ({ prompt, userPlan, userId, onSave }) => {
  const [inputMode, setInputMode] = useState<'text' | 'voice'>('text');
  const [textContent, setTextContent] = useState('');
  const [transcription, setTranscription] = useState('');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const hasVoiceFeatures = userPlan === 'premium' || userPlan === 'legacy';
  const hasAICloning = userPlan === 'legacy';

  const handleVoiceRecordingComplete = (url: string, transcriptionText?: string) => {
    setAudioUrl(url);
    if (transcriptionText) {
      setTranscription(transcriptionText);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const content = inputMode === 'text' ? textContent : transcription;
      await onSave(prompt.id, content, audioUrl || undefined);
      
      // Reset form
      setTextContent('');
      setTranscription('');
      setAudioUrl(null);
      setInputMode('text');
    } catch (error) {
      console.error('Failed to save story:', error);
      alert('Failed to save your story. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const generateAIVoice = async () => {
    if (!hasAICloning || !textContent) return;
    
    try {
      // This would call your AI voice cloning service
      console.log('Generating AI voice for:', textContent);
      // Implementation would go here
    } catch (error) {
      console.error('AI voice generation failed:', error);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <span className="bg-rose-100 text-rose-700 text-xs px-2 py-1 rounded-full">
            {prompt.category}
          </span>
        </div>
        <h2 className="text-2xl font-semibold text-slate-900 mb-4">{prompt.title}</h2>
        <p className="text-lg text-slate-700 leading-relaxed">{prompt.question}</p>
      </div>

      {/* Input Mode Toggle */}
      {hasVoiceFeatures && (
        <div className="flex space-x-2 mb-6">
          <button
            onClick={() => setInputMode('text')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              inputMode === 'text'
                ? 'bg-rose-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Type className="h-4 w-4" />
            <span>Type</span>
          </button>
          <button
            onClick={() => setInputMode('voice')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              inputMode === 'voice'
                ? 'bg-rose-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Mic className="h-4 w-4" />
            <span>Speak</span>
          </button>
        </div>
      )}

      {/* Text Input */}
      {inputMode === 'text' && (
        <div className="mb-6">
          <textarea
            value={textContent}
            onChange={(e) => setTextContent(e.target.value)}
            placeholder="Share your story here..."
            className="w-full h-64 p-4 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 resize-none"
          />
          
          {hasAICloning && textContent && (
            <button
              onClick={generateAIVoice}
              className="mt-3 flex items-center space-x-2 text-purple-600 hover:text-purple-700 transition-colors"
            >
              <Sparkles className="h-4 w-4" />
              <span>Generate AI Voice</span>
            </button>
          )}
        </div>
      )}

      {/* Voice Input */}
      {inputMode === 'voice' && (
        <div className="mb-6">
          <VoiceRecorderComponent
            onRecordingComplete={handleVoiceRecordingComplete}
            userId={userId}
            promptId={prompt.id}
            disabled={!hasVoiceFeatures}
          />
          
          {transcription && (
            <div className="mt-4 p-4 bg-slate-50 rounded-lg">
              <h4 className="font-medium text-slate-900 mb-2">Transcription:</h4>
              <p className="text-slate-700 leading-relaxed">{transcription}</p>
            </div>
          )}
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={isSaving || (!textContent && !transcription)}
          className="flex items-center space-x-2 bg-rose-600 text-white px-6 py-3 rounded-lg hover:bg-rose-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="h-4 w-4" />
          <span>{isSaving ? 'Saving...' : 'Save Story'}</span>
        </button>
      </div>
    </div>
  );
};

export default StoryPrompt;