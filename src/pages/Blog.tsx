import React, { useState } from 'react';
import { ArrowRight, Heart, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts, categoryColors } from '../data/blogData';
import { supabase } from '../lib/supabase';

const Blog: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const getCategoryColor = (category: string) => {
    return categoryColors[category] || "bg-slate-100 text-slate-700";
  };

const handleSubscribe = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!email) return;

  try {
    const { error } = await supabase
      .from('newsletter')
      .insert([{
        email: email,
        source: 'blog'
      }]);

    if (error) {
      if (error.code === '23505') {
        alert('This email is already subscribed!');
      } else {
        console.error('Newsletter error:', error);
        alert('Failed to subscribe. Please try again.');
      }
      return;
    }

    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3000);
  } catch (error) {
    console.error('Newsletter error:', error);
    alert('Something went wrong. Please try again.');
  }
};

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-warm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl lg:text-6xl font-serif text-slate-800 mb-6 text-shadow">
              The <span className="gradient-text">Journal</span>
            </h1>
            <p className="text-xl lg:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Discover insights, guidance, and inspiration to help you capture and preserve
              your family's most precious memories and stories.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article key={index} className="bg-white rounded-2xl overflow-hidden shadow-xl hover-lift">
                <Link to={`/blog/${post.slug}`}>
                  <div className="relative h-[200px] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(post.category)}`}>
                        {post.category}
                      </span>
                    </div>
                  </div>
                </Link>
                <div className="p-6">
                  <Link to={`/blog/${post.slug}`}>
                    <h3 className="text-xl font-serif text-slate-800 mb-3 leading-tight hover:text-rose-600 transition-colors duration-200">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-sm text-slate-500 mb-4">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                    <span>{post.publishDate}</span>
                  </div>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group inline-flex items-center space-x-2 text-rose-600 hover:text-rose-700 font-semibold transition-colors"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-warm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl">
            <Heart className="h-12 w-12 mx-auto mb-6 text-rose-600" />
            <h2 className="text-3xl lg:text-4xl font-serif text-slate-800 mb-6 text-shadow">
              Never Miss a Story
            </h2>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Get weekly inspiration, tips, and stories delivered to your inbox.
              Join thousands of families on their legacy journey.
            </p>
            {subscribed ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-6">
                <p className="text-green-700 font-semibold text-lg">
                  Thank you for subscribing! Check your inbox for a welcome email.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-6 py-3 rounded-full border border-slate-300 focus:ring-2 focus:ring-rose-500 focus:border-rose-500 transition-all"
                />
                <button
                  type="submit"
                  className="bg-rose-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-rose-700 transition-all duration-300 transform hover:scale-105"
                >
                  Subscribe
                </button>
              </form>
            )}
            <p className="text-sm text-slate-500 mt-4">
              No spam, unsubscribe anytime. We respect your privacy.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-elegant">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-serif text-white mb-6 text-shadow">
            Ready to Start Your Story?
          </h2>
          <p className="text-xl text-white/90 mb-12 leading-relaxed">
            Stop reading about legacy stories and start creating your own. 
            Your family's memories are waiting to be preserved.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/checkout"
              className="group bg-white text-rose-600 px-10 py-4 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>Choose Your Plan</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              to="/how-it-works"
              className="group border-2 border-white text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-slate-800 transition-all duration-300"
            >
              Learn How It Works
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;