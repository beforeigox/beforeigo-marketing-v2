import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BookHeart, Mail, Lock, ArrowRight } from 'lucide-react';
import { signIn } from '../lib/auth';

const SignIn: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // Get the intended destination from location state
  const from = location.state?.from?.pathname || '/dashboard';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(''); // Clear error when user starts typing
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await signIn(formData.email, formData.password);
      navigate(from, { replace: true });
    } catch (error: any) {
      console.error('Sign in failed:', error);
      
      // Handle specific Firebase auth errors
      let errorMessage = 'Failed to sign in. Please try again.';
      
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        errorMessage = 'Invalid email or password. Please check your credentials.';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Too many failed attempts. Please try again later.';
      } else if (error.code === 'auth/user-disabled') {
        errorMessage = 'This account has been disabled. Please contact support.';
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <BookHeart className="h-8 w-8 text-rose-600" />
              <div className="text-2xl">
                <span className="font-serif text-slate-900">Before I </span>
                <span className="text-rose-600" style={{ fontFamily: 'Dancing Script, cursive' }}>Go</span>
              </div>
            </div>
            <h1 className="text-2xl font-medium text-slate-900 mb-2">Welcome back</h1>
            <p className="text-slate-600">Sign in to continue your legacy journey</p>
          </div>

          {/* Sign In Form */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
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
                required
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-colors"
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
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-colors"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-slate-300 text-rose-600 focus:ring-rose-500" />
                <span className="ml-2 text-sm text-slate-600">Remember me</span>
              </label>
              <button type="button" className="text-sm text-rose-600 hover:text-rose-700">
                Forgot password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-rose-600 text-white py-4 rounded-lg font-medium hover:bg-rose-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <span>{isLoading ? 'Signing in...' : 'Sign In'}</span>
              {!isLoading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>

          {/* Sign Up Link */}
          <div className="mt-8 text-center">
            <p className="text-slate-600 text-sm">
              Don't have an account?{' '}
              <Link to="/checkout" className="text-rose-600 hover:text-rose-700 font-medium">
                Get started with Before I Go
              </Link>
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <Link to="/" className="text-slate-500 hover:text-slate-700 text-sm">
              ← Back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;