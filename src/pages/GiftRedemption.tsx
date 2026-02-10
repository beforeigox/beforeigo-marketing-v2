import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BookHeart, Gift, Heart, Loader } from 'lucide-react';

const GiftRedemption: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isValidating, setIsValidating] = useState(true);
  const [giftData, setGiftData] = useState<{
    recipientEmail: string;
    senderName: string;
    plan: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    const validateGift = async () => {
      const token = searchParams.get('token');

      if (!token) {
        alert('Invalid gift link. Please check your email for the correct link.');
        navigate('/');
        return;
      }

      try {
        // Mock gift validation - simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        // In a real app, this would validate the token with the backend
        // For now, we'll extract mock data from the token
        const mockGiftData = {
          recipientEmail: 'recipient@example.com',
          senderName: 'Your Loved One',
          plan: 'the keepsake',
          message: 'I thought you\'d enjoy preserving your memories with Before I Go!'
        };

        setGiftData(mockGiftData);
      } catch (error) {
        console.error('Gift validation failed:', error);
        alert('This gift link is invalid or has expired.');
        navigate('/');
      } finally {
        setIsValidating(false);
      }
    };

    validateGift();
  }, [searchParams, navigate]);

  const handleAcceptGift = () => {
    if (!giftData) return;

    // Generate a mock payment ID for the gift
    const paymentId = `gift_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Redirect to account setup with pre-filled email
    const params = new URLSearchParams({
      plan: giftData.plan,
      payment_id: paymentId,
      email: giftData.recipientEmail
    });

    navigate(`/account-setup?${params.toString()}`);
  };

  if (isValidating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4">
        <div className="text-center">
          <Loader className="h-12 w-12 text-amber-600 animate-spin mx-auto mb-4" />
          <p className="text-slate-600">Validating your gift...</p>
        </div>
      </div>
    );
  }

  if (!giftData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="relative bg-gradient-to-br from-amber-500 to-orange-500 p-12 text-center">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full"></div>
              <div className="absolute bottom-10 right-10 w-32 h-32 bg-white rounded-full"></div>
            </div>

            <div className="relative z-10">
              <div className="inline-flex p-6 bg-white/20 backdrop-blur-sm rounded-3xl mb-6">
                <Gift className="h-16 w-16 text-white" />
              </div>

              <h1 className="text-4xl font-serif text-white mb-4">
                You've Received a Gift!
              </h1>

              <div className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <BookHeart className="h-5 w-5 text-white" />
                <span className="text-white font-medium">Before I Go Story Journal</span>
              </div>
            </div>
          </div>

          <div className="p-12">
            <div className="text-center mb-8">
              <p className="text-lg text-slate-600 mb-2">
                From <span className="font-semibold text-slate-900">{giftData.senderName}</span>
              </p>
              {giftData.message && (
                <div className="bg-slate-50 rounded-xl p-6 mt-6">
                  <p className="text-slate-700 italic">"{giftData.message}"</p>
                </div>
              )}
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 mb-8">
              <h2 className="text-2xl font-serif text-slate-900 mb-4 text-center">
                What's Included
              </h2>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Heart className="h-5 w-5 text-rose-500 flex-shrink-0" />
                  <span className="text-slate-700">Complete access to Before I Go story creation platform</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Heart className="h-5 w-5 text-rose-500 flex-shrink-0" />
                  <span className="text-slate-700">Guided prompts to help you capture your memories</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Heart className="h-5 w-5 text-rose-500 flex-shrink-0" />
                  <span className="text-slate-700">Beautiful digital formats for sharing with loved ones</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Heart className="h-5 w-5 text-rose-500 flex-shrink-0" />
                  <span className="text-slate-700">Lifetime access to your story collection</span>
                </div>
              </div>
            </div>

            <button
              onClick={handleAcceptGift}
              className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-4 rounded-xl font-semibold text-lg hover:from-amber-700 hover:to-orange-700 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
            >
              Accept Gift & Create Account
            </button>

            <p className="text-center text-sm text-slate-500 mt-6">
              You'll create your account and start preserving your memories right away
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftRedemption;
