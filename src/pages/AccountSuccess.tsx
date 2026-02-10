import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { BookHeart, CheckCircle, Sparkles } from 'lucide-react';

const AccountSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const userName = searchParams.get('name') || 'there';

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-white rounded-3xl shadow-2xl p-12">
          <div className="inline-flex p-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl mb-6">
            <CheckCircle className="h-16 w-16 text-white" />
          </div>

          <h1 className="text-4xl font-serif text-slate-900 mb-4">
            Account Created Successfully!
          </h1>

          <p className="text-xl text-slate-600 mb-8">
            Welcome to Before I Go, {userName}!
          </p>

          <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-8 mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Sparkles className="h-6 w-6 text-rose-600" />
              <h2 className="text-2xl font-semibold text-slate-900">What's Next?</h2>
              <Sparkles className="h-6 w-6 text-rose-600" />
            </div>

            <p className="text-slate-700 leading-relaxed mb-6">
              Your personal storytelling dashboard is being prepared. Soon you'll be able to:
            </p>

            <div className="space-y-3 text-left max-w-md mx-auto">
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700">Start capturing your precious memories</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700">Answer thoughtfully crafted story prompts</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700">Add photos and videos to your stories</span>
              </div>
              <div className="flex items-start space-x-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700">Create a lasting legacy for your loved ones</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-8">
            <p className="text-slate-700 text-sm leading-relaxed">
              <strong className="text-slate-900">Coming Soon:</strong> Your personalized dashboard
              where you can access all your stories, manage your account, and continue your
              storytelling journey. We'll notify you as soon as it's ready!
            </p>
          </div>

          <Link
            to="/"
            className="inline-flex items-center space-x-2 bg-rose-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-rose-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <BookHeart className="h-5 w-5" />
            <span>Return to Home</span>
          </Link>
        </div>

        <p className="text-slate-500 text-sm mt-8">
          Questions? Contact us at{' '}
          <a href="mailto:support@beforeigo.com" className="text-rose-600 hover:text-rose-700">
            support@beforeigo.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default AccountSuccess;
