import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { BookHeart, User, Mail, Lock, ArrowRight, CheckCircle } from 'lucide-react';

const AccountSetup: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  // Get plan and payment info from URL params (passed from successful payment)
  const plan = searchParams.get('plan') || 'premium';
  const paymentId = searchParams.get('payment_id');
  const email = searchParams.get('email') || '';

  const [formData, setFormData] = useState({
    fullName: '',
    email: email,
    password: '',
    confirmPassword: ''
  });

  useEffect(() => {
    // If no payment ID, redirect to checkout
    if (!paymentId) {
      navigate('/checkout');
    }
  }, [paymentId, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters');
      return;
    }

    setIsLoading(true);
    try {
      // Mock account creation - simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Store mock user data in localStorage
      const mockUser = {
        fullName: formData.fullName,
        email: formData.email,
        plan: plan,
        paymentId: paymentId,
        createdAt: new Date().toISOString()
      };

      localStorage.setItem('beforeIGo_user', JSON.stringify(mockUser));

      console.log('Account created successfully:', mockUser);

      // Redirect to success page with user's name
      const params = new URLSearchParams({
        name: formData.fullName
      });
      navigate(`/account-success?${params.toString()}`);
    } catch (error: any) {
      console.error('Account creation failed:', error);
      alert('Failed to create account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const planNames = {
    'the storyteller': 'The Storyteller',
    'the keepsake': 'The Keepsake',
    'the legacy': 'The Legacy'
  };

  const planFeatures: { [key: string]: string[] } = {
    'the storyteller': [
      'Any 1 "Before I Go" Guided Journal',
      'Text-Based Storytelling',
      'Add up to 50 photos',
      'Standard Digital Export (PDF)',
      'Lifetime Digital Backup'
    ],
    'the keepsake': [
      'Everything in Storyteller, plus:',
      'Audio Recording with your voice',
      'Up to 250 photos',
      'Video Capture (15 second clips)',
      'Family Sharing Portal (10 members)',
      'Premium Export Designs'
    ],
    'the legacy': [
      'Everything in Keepsake, plus:',
      'AI Voice Cloning',
      'AI Handwriting Font',
      'Unlimited Photo & Video Storage',
      'AI Story Weaver™',
      'Collaborative Family Portal (5 contributors)',
      'Luxury Export Designs'
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Welcome & Plan Info */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <BookHeart className="h-8 w-8 text-rose-600" />
                <div className="text-2xl">
                  <span className="font-serif text-slate-900">Before I </span>
                  <span className="text-rose-600" style={{ fontFamily: 'Dancing Script, cursive' }}>Go</span>
                </div>
              </div>
              <h1 className="text-3xl font-light text-slate-900 mb-2">
                Create Your Account
              </h1>
              <p className="text-slate-600">
                Start preserving your precious memories
              </p>
            </div>

            {/* Plan Summary */}
            <div className="bg-slate-50 rounded-xl p-6 mb-6">
              <h3 className="font-medium text-slate-900 mb-4">
                {planNames[plan as keyof typeof planNames] || 'Premium Plan'}
              </h3>
              <ul className="space-y-2">
                {planFeatures[plan]?.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2 text-sm text-slate-600">
                    <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="text-center text-sm text-slate-500">
              <p>Your journey to preserving family memories starts now</p>
            </div>
          </div>

          {/* Right Side - Account Creation Form */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-medium text-slate-900 mb-6">Create Your Account</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <User className="h-4 w-4 inline mr-2" />
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  autoComplete="name"
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-colors"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Mail className="h-4 w-4 inline mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!!email}
                  required
                  autoComplete="email"
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-colors disabled:bg-slate-100 disabled:text-slate-600"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Lock className="h-4 w-4 inline mr-2" />
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  minLength={6}
                  autoComplete="new-password"
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-colors"
                  placeholder="Create a password (min. 6 characters)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  <Lock className="h-4 w-4 inline mr-2" />
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                  minLength={6}
                  autoComplete="new-password"
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-colors"
                  placeholder="Confirm your password"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-rose-600 text-white py-4 rounded-lg font-medium hover:bg-rose-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <span>{isLoading ? 'Creating Account...' : 'Create Account & Continue'}</span>
                {!isLoading && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-slate-500">
              <p>
                By creating an account, you agree to our{' '}
                <a href="#" className="text-rose-600 hover:text-rose-700">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-rose-600 hover:text-rose-700">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSetup;