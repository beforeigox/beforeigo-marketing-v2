import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Check, ArrowRight, Heart, User, Gift, Sparkles, Eye, EyeOff, Package, Truck } from 'lucide-react';
import { signUp } from '../lib/auth';

type ViewState = 'who-is-this-for' | 'account-creation' | 'gift-form' | 'gift-sent';

const Success: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const orderType = searchParams.get('type');

  const [viewState, setViewState] = useState<ViewState>('who-is-this-for');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');

  const [giftEmail, setGiftEmail] = useState('');
  const [giftMessage, setGiftMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleForMyself = () => {
    setViewState('account-creation');
  };

  const handleForSomeoneElse = () => {
    setViewState('gift-form');
  };

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setError('');
    setIsCreating(true);

    try {
      await signUp(email, password, name);
      navigate('/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create account');
      setIsCreating(false);
    }
  };

  const handleSendGift = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!giftEmail.trim()) {
      setError('Please enter recipient email address');
      return;
    }

    setError('');
    setIsSending(true);

    try {
      console.log('Sending gift to:', giftEmail, 'Message:', giftMessage, 'Session:', sessionId);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setViewState('gift-sent');
    } catch (err) {
      setError('Failed to send gift');
    } finally {
      setIsSending(false);
    }
  };

  if (orderType === 'physical-journal') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden">
          <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 p-12 text-center">
            <div className="inline-flex p-5 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl mb-6">
              <Check className="h-12 w-12 text-white" />
            </div>

            <h1 className="text-4xl font-serif text-slate-900 mb-4">
              Order Confirmed!
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed max-w-md mx-auto">
              Your physical journal is being prepared for printing
            </p>
          </div>

          <div className="p-12">
            <div className="bg-amber-50 rounded-2xl p-8 mb-8 border-2 border-amber-200">
              <div className="flex items-start space-x-4 mb-6">
                <Package className="h-8 w-8 text-amber-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Your Journal is Being Printed</h3>
                  <p className="text-slate-600 leading-relaxed">
                    We're creating your custom Before I Go journal with all the thoughtful questions tailored for the role you selected.
                  </p>
                </div>
              </div>

              <ul className="space-y-3 text-slate-700">
                <li className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Premium quality printing on cream pages</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Custom-made for the role you chose</span>
                </li>
                <li className="flex items-start space-x-3">
                  <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Ships in 3-5 business days</span>
                </li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-2xl p-8 mb-8 border-2 border-blue-200">
              <div className="flex items-start space-x-4">
                <Truck className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">Delivery Information</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    Estimated delivery: <span className="font-semibold text-slate-900">5-7 business days</span>
                  </p>
                  <p className="text-sm text-slate-600">
                    You'll receive a confirmation email with tracking information as soon as your journal ships. Check your inbox for updates!
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-12 py-4 rounded-xl font-semibold hover:from-amber-700 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl"
              >
                Return to Home
              </button>
              <p className="text-sm text-slate-500 mt-4">
                Questions? Contact us at support@beforeigo.app
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (viewState === 'account-creation') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden">
          <div className="relative bg-gradient-to-br from-blue-50 to-cyan-50 p-8 text-center">
            <div className="inline-flex p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-4">
              <User className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-serif text-slate-900 mb-2">
              Create Your Account
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Let's get you started on your legacy journey
            </p>
          </div>

          <form onSubmit={handleCreateAccount} className="p-8">
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  autoFocus
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  autoComplete="email"
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a secure password"
                    autoComplete="new-password"
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-colors pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setViewState('who-is-this-for')}
                disabled={isCreating}
                className="flex-1 bg-slate-200 text-slate-700 py-3 rounded-xl font-medium hover:bg-slate-300 transition-colors disabled:opacity-50"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isCreating}
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {isCreating ? (
                  <span>Creating...</span>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (viewState === 'gift-form') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden">
          <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 p-8 text-center">
            <div className="inline-flex p-4 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl mb-4">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-serif text-slate-900 mb-2">
              Send Your Gift
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Share the gift of legacy with someone special
            </p>
          </div>

          <form onSubmit={handleSendGift} className="p-8">
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Recipient's Email
                </label>
                <input
                  type="email"
                  value={giftEmail}
                  onChange={(e) => setGiftEmail(e.target.value)}
                  placeholder="recipient@example.com"
                  autoComplete="email"
                  autoFocus
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Personal Message (Optional)
                </label>
                <textarea
                  value={giftMessage}
                  onChange={(e) => setGiftMessage(e.target.value)}
                  placeholder="Add a heartfelt message to your gift..."
                  rows={4}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors resize-none"
                />
              </div>

              {error && (
                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}
            </div>

            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setViewState('who-is-this-for')}
                disabled={isSending}
                className="flex-1 bg-slate-200 text-slate-700 py-3 rounded-xl font-medium hover:bg-slate-300 transition-colors disabled:opacity-50"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isSending}
                className="flex-1 bg-amber-600 text-white py-3 rounded-xl font-semibold hover:bg-amber-700 transition-colors disabled:opacity-50"
              >
                {isSending ? 'Sending...' : 'Send Gift'}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (viewState === 'gift-sent') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden">
          <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 p-12 text-center">
            <div className="inline-flex p-5 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl mb-6">
              <Gift className="h-12 w-12 text-white" />
            </div>

            <div className="mb-4">
              <div className="text-5xl mb-4">🎉</div>
              <h2 className="text-3xl font-serif text-slate-900 mb-3">
                Gift Sent!
              </h2>
              <p className="text-slate-600 leading-relaxed">
                Your thoughtful gift has been sent to <span className="font-medium text-slate-900">{giftEmail}</span>
              </p>
            </div>

            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 mb-8">
              <p className="text-sm text-slate-600 leading-relaxed">
                They'll receive an email with instructions on how to redeem their Before I Go legacy experience.
              </p>
            </div>

            <button
              onClick={() => navigate('/')}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg hover:shadow-xl"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden">
        <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 p-8 text-center">
          <div className="inline-flex p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-4">
            <Check className="h-8 w-8 text-white" />
          </div>

          <h2 className="text-2xl font-serif text-slate-900 mb-2">
            Payment Successful!
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Who is this purchase for?
          </p>
        </div>

        <div className="p-8 space-y-4">
          <button
            onClick={handleForMyself}
            className="w-full flex items-center justify-between p-6 border-2 border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-500 transition-colors">
                <User className="h-6 w-6 text-blue-600 group-hover:text-white" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-slate-900">This is for me</div>
                <div className="text-sm text-slate-600">Start creating your story now</div>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-blue-500" />
          </button>

          <button
            onClick={handleForSomeoneElse}
            className="w-full flex items-center justify-between p-6 border-2 border-slate-200 rounded-xl hover:border-amber-500 hover:bg-amber-50 transition-all group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-amber-100 rounded-xl group-hover:bg-amber-500 transition-colors">
                <Heart className="h-6 w-6 text-amber-600 group-hover:text-white" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-slate-900">This is a gift</div>
                <div className="text-sm text-slate-600">Send this to someone special</div>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-amber-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Success;
