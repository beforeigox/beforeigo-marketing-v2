import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink } from 'lucide-react';

const StoryEditor: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const handleStartStory = () => {
    // This will redirect to the separate story creation app (Conversation #3)
    const storyAppUrl = 'https://story-app.beforeigo.com'; // This would be the actual URL
    window.open(storyAppUrl, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/dashboard/stories')}
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-medium text-slate-900">Start Your Story</h1>
            <p className="text-slate-600">
              Create your legacy story with our guided prompts
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate('/dashboard/stories')}
            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      {/* Story Creation Launch */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-serif text-slate-900 mb-6">
            Ready to Share Your Story?
          </h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Our guided storytelling experience will help you capture your most precious memories 
            and wisdom through thoughtfully crafted prompts designed just for you.
          </p>
          
          <button
            onClick={handleStartStory}
            className="inline-flex items-center space-x-3 bg-rose-600 text-white px-8 py-4 rounded-lg hover:bg-rose-700 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <span>Start Your Story</span>
            <ExternalLink className="h-5 w-5" />
          </button>
          
          <p className="text-sm text-slate-500 mt-4">
            Opens in a new window for the best storytelling experience
          </p>
        </div>
      </div>

      {/* Information Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
          <h3 className="font-semibold text-slate-900 mb-3">📝 Guided Prompts</h3>
          <p className="text-sm text-slate-700">
            Thoughtfully crafted questions help you remember and share stories you never knew you had.
          </p>
        </div>
        
        <div className="bg-green-50 rounded-xl p-6 border border-green-100">
          <h3 className="font-semibold text-slate-900 mb-3">⏰ Your Own Pace</h3>
          <p className="text-sm text-slate-700">
            Take your time. Write a little each day or complete multiple stories in one sitting.
          </p>
        </div>
        
        <div className="bg-purple-50 rounded-xl p-6 border border-purple-100">
          <h3 className="font-semibold text-slate-900 mb-3">💝 Beautiful Legacy</h3>
          <p className="text-sm text-slate-700">
            Your stories become a treasured family heirloom that can be shared for generations.
          </p>
        </div>
      </div>
      
      {/* Tips Section */}
      <div className="mt-8 bg-slate-50 rounded-xl p-6 border border-slate-200">
        <h3 className="font-medium text-slate-900 mb-3">💡 Writing Tips</h3>
        <ul className="space-y-2 text-sm text-slate-700">
          <li>• Write as if you're talking to a close friend or family member</li>
          <li>• Include specific details - they make your stories come alive</li>
          <li>• Don't worry about perfect grammar - authenticity matters more</li>
          <li>• Take your time - you can always come back and continue later</li>
        </ul>
      </div>
    </div>
  );
};

export default StoryEditor;