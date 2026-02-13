import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, BookHeart, Heart, Star, ArrowRight, Quote, Play, X, Mail, User } from 'lucide-react';
import SuccessNotification from '../components/SuccessNotification';
import { supabase } from '../lib/supabase';

const quotes = [
  {
    text: "The stories we tell about our past shape who we become. Every family has tales worth preserving.",
    author: "Margaret Chen",
    story: "Letters to My Grandmother",
    image: "/margaret-photo.png"
  },
  {
    text: "I never knew my father could laugh so hard until I read his childhood memories. Stories reveal the person behind the parent.",
    author: "David Rodriguez",
    story: "Dad's Hidden Adventures",
    image: "/david-photo.png"
  },
  {
    text: "Our family recipes weren't just ingredients—they were love letters passed down through generations.",
    author: "Sarah Thompson",
    story: "Kitchen Chronicles",
    image: "/grandma2.jpg"
  }
];
// Isolated Newsletter Form Component - This prevents the main component from re-rendering
const NewsletterForm: React.FC<{ onClose: () => void; onSuccess: () => void }> = ({ onClose, onSuccess }) => {
  // State is isolated to this component only
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { data, error } = await supabase
        .from('newsletter')
        .insert([{
          name: formData.name,
          email: formData.email,
          source: 'popup'
        }]);

      if (error) {
        console.error('Supabase error:', error);
        if (error.code === '23505') {
          alert('This email is already subscribed to our newsletter!');
        } else {
          alert('Failed to subscribe. Please try again.');
        }
        return;
      }

      onClose();
      onSuccess();
      setFormData({ name: '', email: '' });
    } catch (error) {
      console.error('Newsletter error:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-all duration-500 opacity-100"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl transform transition-all duration-500 scale-100 translate-y-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative p-8 pb-6">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-all duration-200"
            type="button"
          >
            <X className="h-5 w-5" />
          </button>
          
          <div className="text-center">
            <div className="inline-flex p-3 bg-gradient-to-br from-rose-500 to-rose-600 rounded-2xl mb-4">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-serif text-slate-900 mb-2">
              Join Our Newsletter
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Get <span className="font-semibold text-rose-600">10% off</span> your first story + tips for preserving family memories
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="px-8 pb-8">
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="newsletter-name" className="block text-sm font-medium text-slate-700 mb-2">
                <User className="h-4 w-4 inline mr-2" />
                Name
              </label>
              <input
                id="newsletter-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                autoComplete="given-name"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all duration-300 outline-none"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="newsletter-email" className="block text-sm font-medium text-slate-700 mb-2">
                <Mail className="h-4 w-4 inline mr-2" />
                Email
              </label>
              <input
                id="newsletter-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                autoComplete="email"
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all duration-300 outline-none"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-rose-600 to-rose-700 text-white py-4 rounded-xl font-semibold hover:from-rose-700 hover:to-rose-800 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg hover:shadow-xl"
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </button>

          <p className="text-xs text-slate-500 text-center mt-4">
            We'll never spam you. Unsubscribe anytime.
          </p>
        </form>
      </div>
    </div>
  );
};

const Home: React.FC = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [showNewsletter, setShowNewsletter] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    // Show newsletter popup after a short delay
    const newsletterTimer = setTimeout(() => {
      setShowNewsletter(true);
    }, 2000);

    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(newsletterTimer);
    };
  }, []);

  const nextQuote = useCallback(() => {
    setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
  }, []);

  const prevQuote = useCallback(() => {
    setCurrentQuoteIndex((prev) => (prev - 1 + quotes.length) % quotes.length);
  }, []);

  const openNewsletter = useCallback(() => {
    setShowNewsletter(true);
  }, []);

  const closeNewsletter = useCallback(() => {
    setShowNewsletter(false);
  }, []);

  const showSuccessNotification = useCallback(() => {
    setShowSuccess(true);
  }, []);

  const closeSuccessNotification = useCallback(() => {
    setShowSuccess(false);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Newsletter Popup - Only renders when needed */}
      {showNewsletter && (
        <NewsletterForm
          onClose={closeNewsletter}
          onSuccess={showSuccessNotification}
        />
      )}

      {/* Success Notification */}
      <SuccessNotification
        isVisible={showSuccess}
        onClose={closeSuccessNotification}
      />

      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-gradient-warm">
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-20 h-20 bg-rose-200 rounded-full opacity-20 floating-animation"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-blue-200 rounded-full opacity-20 floating-animation" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-purple-200 rounded-full opacity-20 floating-animation" style={{ animationDelay: '4s' }}></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'fade-in-up' : ''}`}>
            <h1 className="text-4xl lg:text-6xl font-light text-slate-900 mb-8 leading-tight text-shadow">
              Before I Go,
              <span className="block font-serif font-medium gradient-text">Let Me Tell You My Story</span>
            </h1>
          </div>
          
          <div className={`transition-all duration-1000 stagger-1 ${isVisible ? 'fade-in-up' : ''}`}>
            <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Create a beautiful legacy book filled with your most precious memories, wisdom, and stories. 
              Give your loved ones the gift of knowing who you really are.
            </p>
          </div>
          
          <div className={`flex flex-col sm:flex-row gap-4 justify-center stagger-2 ${isVisible ? 'fade-in-up' : ''}`}>
            <Link
              to="/checkout"
              className="group bg-rose-600 text-white px-8 py-4 rounded-full font-medium hover:bg-rose-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>Start Your Story Today</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link 
              to="/demo"
              className="group glass-effect text-slate-700 px-8 py-4 rounded-full font-medium hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span className="flex items-center justify-center space-x-2">
                <Play className="h-4 w-4" />
                <span>See How It Works</span>
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Your Legacy Matters Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif text-slate-900 mb-4 text-shadow">
              Why Your Legacy Matters
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Every life is a unique journey filled with lessons, love, and moments that deserve to be remembered forever.
            </p>
          </div>

          {/* Hero Video */}
          <div className="max-w-5xl mx-auto">
            <div className="relative w-full rounded-xl overflow-hidden shadow-2xl" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube-nocookie.com/embed/vLdL9PvA4xI?rel=0&modestbranding=1"
                title="Why Your Legacy Matters"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                referrerPolicy="strict-origin-when-cross-origin"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Quotes Section */}
      <section className="py-20 bg-gradient-warm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-serif text-slate-900 mb-4 text-shadow">
              Stories That Touch Hearts
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Real quotes from families who've captured their most precious memories
            </p>
          </div>

          <div className="relative bg-gradient-elegant rounded-3xl p-8 lg:p-16 text-white overflow-hidden shadow-2xl">
            {/* Decorative elements */}
            <div className="absolute top-6 left-8 opacity-10">
              <Quote className="h-16 w-16" />
            </div>
            <div className="absolute bottom-6 right-8 opacity-5">
              <BookHeart className="h-32 w-32" />
            </div>
            
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="flex-1">
                  <blockquote className="text-xl lg:text-2xl font-light leading-relaxed mb-8 text-shadow">
                    "{quotes[currentQuoteIndex].text}"
                  </blockquote>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Heart className="h-6 w-6 text-rose-300" />
                    </div>
                    <div>
                      <p className="font-semibold text-lg">{quotes[currentQuoteIndex].author}</p>
                      <p className="text-slate-300 text-sm italic">{quotes[currentQuoteIndex].story}</p>
                    </div>
                  </div>
                </div>
                <div className="relative group">
                  <div className="w-64 h-64 lg:w-72 lg:h-72 rounded-2xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
                    <img 
                      src={quotes[currentQuoteIndex].image} 
                      alt="Story illustration"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                </div>
              </div>
              
              <div className="flex justify-center mt-12 space-x-4">
                <button 
                  onClick={prevQuote}
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110"
                  type="button"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button 
                  onClick={nextQuote}
                  className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110"
                  type="button"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-3">
            {quotes.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuoteIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentQuoteIndex 
                    ? 'bg-rose-600 scale-125' 
                    : 'bg-slate-300 hover:bg-slate-400'
                }`}
                type="button"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-warm rounded-3xl p-8 lg:p-12 shadow-xl">
            <h2 className="text-3xl lg:text-4xl font-serif text-slate-900 mb-6 text-shadow">
              Your Story Deserves to Live Forever
            </h2>
            <p className="text-lg text-slate-600 mb-12 leading-relaxed max-w-2xl mx-auto">
              Don't let your precious memories fade away. Create a beautiful legacy that your family will treasure for generations to come.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={openNewsletter}
                className="group bg-rose-600 text-white px-8 py-4 rounded-full font-medium hover:bg-rose-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                type="button"
              >
                <span className="flex items-center justify-center space-x-2">
                  <span>Join Our Newsletter</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>
              <Link
                to="/testimonials"
                className="group glass-effect text-slate-700 px-8 py-4 rounded-full font-medium hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                <span className="flex items-center justify-center space-x-2">
                  <Star className="h-4 w-4" />
                  <span>Read Success Stories</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;