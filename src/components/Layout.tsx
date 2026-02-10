import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { BookHeart, Menu, X, User, Gift, Heart } from 'lucide-react';
import { DOMAIN } from '../config/domain';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: 'How It Works', href: '/how-it-works' },
    { name: 'About', href: '/about' },
    { name: 'Stories', href: '/testimonials' },
    { name: 'Demo', href: '/demo' },
    { name: 'Blog', href: '/blog' },
    { name: 'Help', href: '/help' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handlePurchaseClick = () => {
    // Navigate to checkout (recipient will be selected after payment)
    navigate('/checkout');
  };

  const SignInModal = () => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl transform transition-all duration-300 scale-100">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-semibold text-slate-900">Welcome back</h2>
          <button 
            onClick={() => setShowSignIn(false)}
            className="text-slate-400 hover:text-slate-600 transition-colors p-1 hover:bg-slate-100 rounded-full"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form className="space-y-5">
          <div>
            <input 
              type="email" 
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all duration-300"
              placeholder="Email address"
            />
          </div>
          <div>
            <input 
              type="password" 
              className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all duration-300"
              placeholder="Password"
            />
          </div>
          <button 
            type="submit"
            className="w-full bg-rose-600 text-white py-3 rounded-xl font-medium hover:bg-rose-700 transition-all duration-300 transform hover:scale-[1.02]"
          >
            Sign in
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-slate-600 text-sm">
            New to Before I Go?{' '}
            <Link to="/checkout" className="text-rose-600 hover:text-rose-700 font-medium">
              Get started
            </Link>
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="glass-effect border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="p-1 rounded-lg group-hover:bg-rose-50 transition-colors">
                <BookHeart className="h-7 w-7 text-rose-600" />
              </div>
              <div className="text-2xl">
                <span className="font-serif text-slate-900">Before I </span>
                <span className="font-cursive text-rose-600" style={{ fontFamily: 'Dancing Script, cursive' }}>Go</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-all duration-300 relative group ${
                    isActive(item.href)
                      ? 'text-rose-600'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {item.name}
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-rose-600 transition-all duration-300 group-hover:w-full ${
                    isActive(item.href) ? 'w-full' : ''
                  }`}></span>
                </Link>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <button
                onClick={() => setShowSignIn(true)}
                className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all duration-300"
              >
                <User className="h-5 w-5" />
              </button>
              <button
                onClick={handlePurchaseClick}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-rose-600 border border-rose-200 rounded-full hover:bg-rose-50 transition-all duration-300 transform hover:scale-105"
              >
                <Gift className="h-4 w-4" />
                <span>Gift a Legacy</span>
              </button>
              <button
                onClick={handlePurchaseClick}
                className="flex items-center space-x-2 px-4 py-2 text-white bg-rose-600 rounded-full hover:bg-rose-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-semibold"
              >
                <Heart className="h-4 w-4" />
                <span>Start Your Story</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-all duration-300"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t border-slate-100 bg-white/95 backdrop-blur-sm">
              <div className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-base font-medium transition-colors ${
                      isActive(item.href)
                        ? 'text-rose-600'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    setShowSignIn(true);
                  }}
                  className="flex items-center space-x-2 text-slate-600 w-fit"
                >
                  <User className="h-4 w-4" />
                  <span>Sign in</span>
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handlePurchaseClick();
                  }}
                  className="flex items-center space-x-2 px-4 py-2 text-rose-600 border border-rose-200 rounded-xl w-fit"
                >
                  <Gift className="h-4 w-4" />
                  <span>Gift a Legacy</span>
                </button>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handlePurchaseClick();
                  }}
                  className="flex items-center space-x-2 px-4 py-2 text-white bg-rose-600 rounded-xl w-fit font-semibold"
                >
                  <Heart className="h-4 w-4" />
                  <span>Start Your Story</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Sign In Modal */}
      {showSignIn && <SignInModal />}

      {/* Footer */}
      <footer className="bg-gradient-warm border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <BookHeart className="h-6 w-6 text-rose-600" />
                <div className="text-lg">
                  <span className="font-serif text-slate-900">Before I </span>
                  <span className="text-rose-600" style={{ fontFamily: 'Dancing Script, cursive' }}>Go</span>
                </div>
              </div>
              <p className="text-slate-600 max-w-md leading-relaxed">
                Preserving precious memories and connecting generations through the power of storytelling.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Product</h3>
              <ul className="space-y-3 text-slate-600">
                <li><Link to="/how-it-works" className="hover:text-slate-900 transition-colors">How It Works</Link></li>
                <li><Link to="/demo" className="hover:text-slate-900 transition-colors">Demo</Link></li>
                <li><Link to="/testimonials" className="hover:text-slate-900 transition-colors">Stories</Link></li>
                <li><Link to="/blog" className="hover:text-slate-900 transition-colors">Blog</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Support</h3>
              <ul className="space-y-3 text-slate-600">
                <li><Link to="/help" className="hover:text-slate-900 transition-colors">Help Center</Link></li>
                <li><Link to="/about" className="hover:text-slate-900 transition-colors">About</Link></li>
                <li><button onClick={() => setShowSignIn(true)} className="hover:text-slate-900 transition-colors">Sign In</button></li>
                <li><a href={`mailto:${DOMAIN.contact}`} className="hover:text-slate-900 transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-200 mt-8 pt-8 text-center">
            <p className="text-slate-500 text-sm">© 2025 {DOMAIN.name}. All rights reserved. | <a href={DOMAIN.production} className="hover:text-slate-700 transition-colors">{DOMAIN.production.replace('https://', '')}</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;