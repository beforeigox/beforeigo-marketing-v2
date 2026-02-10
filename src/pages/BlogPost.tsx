import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Clock, Heart } from 'lucide-react';
import { blogPosts, categoryColors } from '../data/blogData';
import { DOMAIN } from '../config/domain';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const post = blogPosts.find(p => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (post) {
      document.title = post.seoTitle;

      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', post.seoDescription);

      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', `${DOMAIN.production}/blog/${post.slug}`);

      let ogUrl = document.querySelector('meta[property="og:url"]');
      if (!ogUrl) {
        ogUrl = document.createElement('meta');
        ogUrl.setAttribute('property', 'og:url');
        document.head.appendChild(ogUrl);
      }
      ogUrl.setAttribute('content', `${DOMAIN.production}/blog/${post.slug}`);

      let ogTitle = document.querySelector('meta[property="og:title"]');
      if (!ogTitle) {
        ogTitle = document.createElement('meta');
        ogTitle.setAttribute('property', 'og:title');
        document.head.appendChild(ogTitle);
      }
      ogTitle.setAttribute('content', post.seoTitle);

      let ogDescription = document.querySelector('meta[property="og:description"]');
      if (!ogDescription) {
        ogDescription = document.createElement('meta');
        ogDescription.setAttribute('property', 'og:description');
        document.head.appendChild(ogDescription);
      }
      ogDescription.setAttribute('content', post.seoDescription);
    }
  }, [slug, post]);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const getCategoryColor = (category: string) => {
    return categoryColors[category] || "bg-slate-100 text-slate-700";
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3000);
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-warm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/blog"
            className="inline-flex items-center space-x-2 text-slate-600 hover:text-slate-800 mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Blog</span>
          </Link>

          <div className="mb-6">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(post.category)}`}>
              {post.category}
            </span>
          </div>

          <h1 className="text-4xl lg:text-5xl font-serif text-slate-800 mb-6 leading-tight text-shadow">
            {post.title}
          </h1>

          <div className="flex items-center space-x-4 text-slate-600">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>{post.readTime}</span>
            </div>
            <span>•</span>
            <span>{post.publishDate}</span>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="py-8 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative w-full overflow-hidden rounded-2xl shadow-xl" style={{ maxHeight: '400px' }}>
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
              style={{ maxHeight: '400px' }}
            />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="blog-post-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-warm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl">
            <Heart className="h-12 w-12 mx-auto mb-6 text-rose-600" />
            <h2 className="text-3xl lg:text-4xl font-serif text-slate-800 mb-6 text-shadow">
              Enjoyed This Article?
            </h2>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Get more insights like this delivered to your inbox. Join thousands of families
              preserving their legacies.
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

      {/* Related Posts */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-serif text-slate-800 mb-12 text-center text-shadow">
            More Articles You Might Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {blogPosts
              .filter(p => p.slug !== slug)
              .slice(0, 3)
              .map((relatedPost, index) => (
                <Link
                  key={index}
                  to={`/blog/${relatedPost.slug}`}
                  className="bg-white rounded-2xl overflow-hidden shadow-xl hover-lift"
                >
                  <div className="relative h-[200px] overflow-hidden">
                    <img
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(relatedPost.category)}`}>
                      {relatedPost.category}
                    </span>
                    <h3 className="text-xl font-serif text-slate-800 mt-4 mb-3 leading-tight hover:text-rose-600 transition-colors">
                      {relatedPost.title}
                    </h3>
                    <p className="text-slate-600 text-sm">
                      {relatedPost.excerpt.slice(0, 100)}...
                    </p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
