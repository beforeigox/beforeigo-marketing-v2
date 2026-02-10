import React, { useEffect, useState } from 'react';
import { CheckCircle, X, Sparkles, Heart } from 'lucide-react';

interface SuccessNotificationProps {
  isVisible: boolean;
  onClose: () => void;
  title?: string;
  message?: string;
}

const SuccessNotification: React.FC<SuccessNotificationProps> = ({
  isVisible,
  onClose,
  title = "Welcome to the Waitlist!",
  message = "Thank you for joining our waitlist! We'll be in touch soon with early access details and your exclusive 10% discount."
}) => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      // Small delay to ensure the component is rendered before animation
      setTimeout(() => setIsAnimating(true), 50);

      // Auto-close after 8 seconds (gives users time to read the success message)
      const timer = setTimeout(() => {
        handleClose();
      }, 8000);

      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => {
      setShouldRender(false);
      onClose();
    }, 300);
  };

  if (!shouldRender) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
      isAnimating ? 'bg-black/20 backdrop-blur-sm' : 'bg-transparent'
    }`}>
      <div className={`relative max-w-md w-full transform transition-all duration-500 ease-out ${
        isAnimating 
          ? 'translate-y-0 scale-100 opacity-100' 
          : 'translate-y-8 scale-95 opacity-0'
      }`}>
        {/* Main notification card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-green-100">
          {/* Success header with gradient */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-white relative overflow-hidden">
            {/* Floating sparkles */}
            <div className="absolute top-2 right-4 opacity-30">
              <Sparkles className="h-6 w-6 animate-pulse" />
            </div>
            <div className="absolute bottom-2 left-4 opacity-20">
              <Heart className="h-4 w-4 animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
            
            <div className="flex items-center space-x-4 relative z-10">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-7 w-7 text-white" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-serif font-semibold text-white">
                  {title}
                </h3>
                <p className="text-green-100 text-sm mt-1">
                  You're all set! 🎉
                </p>
              </div>
              <button
                onClick={handleClose}
                className="flex-shrink-0 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>

          {/* Message content */}
          <div className="p-6">
            <p className="text-slate-600 leading-relaxed mb-6">
              {message}
            </p>
            
            {/* Benefits list */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4 mb-6">
              <h4 className="font-semibold text-slate-800 mb-3 text-sm">What happens next:</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span>Early access invitation (coming soon!)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span>Exclusive 10% discount code</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  <span>Behind-the-scenes updates</span>
                </li>
              </ul>
            </div>

            {/* Action button */}
            <button
              onClick={handleClose}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
            >
              Perfect! Let's Go
            </button>
          </div>
        </div>

        {/* Subtle glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-3xl opacity-20 blur-xl -z-10 scale-110"></div>
      </div>
    </div>
  );
};

export default SuccessNotification;