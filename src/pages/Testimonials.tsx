import React from 'react';
import { Star, Quote, Heart, BookHeart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Margaret Chen",
      age: 72,
      location: "San Francisco, CA",
      image: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400",
      story: "Letters to My Grandmother",
      rating: 5,
      quote: "I never thought I had interesting stories to tell until Before I Go helped me realize that my ordinary life was actually extraordinary. My grandchildren now know about their great-grandmother's courage during the war.",
      highlight: "Discovered family courage"
    },
    {
      name: "David Rodriguez",
      age: 58,
      location: "Austin, TX",
      image: "https://images.pexels.com/photos/1054289/pexels-photo-1054289.jpeg?auto=compress&cs=tinysrgb&w=400",
      story: "Dad's Hidden Adventures",
      rating: 5,
      quote: "As a single father, I wanted my kids to know not just what I did, but who I am. The prompts helped me share stories I'd forgotten - like the time I hitchhiked across the country at 19. My teenagers actually think I'm cool now!",
      highlight: "Connected with teenagers"
    },
    {
      name: "Sarah Thompson",
      age: 44,
      location: "Portland, OR",
      image: "https://images.pexels.com/photos/745045/pexels-photo-745045.jpeg?auto=compress&cs=tinysrgb&w=400",
      story: "Kitchen Chronicles",
      rating: 5,
      quote: "Every recipe in my kitchen had a story, but I never wrote them down. Before I Go helped me create a cookbook that's really a love story - about my mother, my marriage, and the meals that brought us together.",
      highlight: "Created family cookbook"
    },
    {
      name: "James Wilson",
      age: 78,
      location: "Charleston, SC",
      image: "https://images.pexels.com/photos/1382731/pexels-photo-1382731.jpeg?auto=compress&cs=tinysrgb&w=400",
      story: "Echoes in Time",
      rating: 5,
      quote: "I was diagnosed with early-stage dementia, and my biggest fear was that my memories would disappear. Before I Go helped me capture 50 years of marriage, my military service, and the lessons I learned.",
      highlight: "Preserved memories before dementia"
    },
    {
      name: "Rosa Martinez",
      age: 69,
      location: "Phoenix, AZ",
      image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=400",
      story: "Crossing Borders",
      rating: 5,
      quote: "I immigrated to America with nothing but hope and determination. My children knew I worked hard, but they didn't know the full story of our journey. Now they understand the sacrifices and the incredible strength it took.",
      highlight: "Shared immigration journey"
    },
    {
      name: "Robert Kim",
      age: 61,
      location: "Seattle, WA",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
      story: "Building Dreams",
      rating: 5,
      quote: "As an entrepreneur, I've had many ups and downs. Before I Go helped me share not just my successes, but my failures and what they taught me. My son says it's the best business advice he's ever received.",
      highlight: "Passed on business wisdom"
    }
  ];

  const stats = [
    { 
      showStars: true,
      label: "Customer Review"
    },
    { number: "100%", label: "Customers Satisfied" },
    { number: "2,500+", label: "Stories Created" },
    { number: "10,000+", label: "Relatives Connected" }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-warm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-serif text-slate-800 mb-6 text-shadow">
              Stories of <span className="gradient-text">Connection & Love</span>
            </h1>
            <p className="text-xl lg:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Real families sharing how Before I Go helped them preserve their most precious memories 
              and strengthen the bonds between generations.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-white rounded-2xl p-6 shadow-xl hover-lift">
                {stat.showStars ? (
                  <div className="mb-2">
                    <div className="flex justify-center items-center space-x-1 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="h-6 w-6 fill-current" 
                          style={{ 
                            color: '#8F1133', // Brand color - same as Leave Your Legacy button
                            filter: 'drop-shadow(0 1px 2px rgba(143, 17, 51, 0.3))'
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-3xl lg:text-4xl font-bold mb-2 gradient-text">{stat.number}</div>
                )}
                <div className="text-slate-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-8 shadow-xl hover-lift">
                <div className="flex items-start space-x-4 mb-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover shadow-lg"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="text-xl font-serif text-slate-800">{testimonial.name}</h3>
                      <span className="text-slate-500">•</span>
                      <span className="text-slate-600">{testimonial.age}</span>
                    </div>
                    <p className="text-slate-500 text-sm mb-2">{testimonial.location}</p>
                    <div className="flex items-center space-x-1 mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star 
                          key={i} 
                          className="h-4 w-4 fill-current" 
                          style={{ 
                            color: '#8F1133',
                            filter: 'drop-shadow(0 1px 1px rgba(143, 17, 51, 0.2))'
                          }}
                        />
                      ))}
                    </div>
                    <p className="font-semibold text-sm gradient-text">{testimonial.story}</p>
                  </div>
                </div>
                
                <div className="relative">
                  <Quote className="h-8 w-8 absolute -top-2 -left-2 text-rose-600 opacity-20" />
                  <blockquote className="text-slate-700 leading-relaxed pl-6 mb-4">
                    {testimonial.quote}
                  </blockquote>
                </div>
                
                <div className="flex items-center space-x-2 text-sm">
                  <Heart className="h-4 w-4 text-rose-600" />
                  <span className="text-slate-600 font-medium">{testimonial.highlight}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Story Section */}
      <section className="py-20 bg-gradient-elegant">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-8 lg:p-16 text-white bg-gradient-to-r from-rose-600 to-rose-700 shadow-2xl">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-serif mb-6 text-shadow">
                Featured Story: The Recipe Box
              </h2>
              <p className="text-xl opacity-90 max-w-3xl mx-auto">
                How one grandmother's recipe collection became a family's most treasured heirloom
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <img 
                    src="https://images.pexels.com/photos/745045/pexels-photo-745045.jpeg?auto=compress&cs=tinysrgb&w=400" 
                    alt="Sarah Thompson"
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                  />
                  <div>
                    <h3 className="text-2xl font-serif">Sarah Thompson</h3>
                    <p className="opacity-80">Portland, OR • Age 44</p>
                  </div>
                </div>
                
                <blockquote className="text-xl leading-relaxed mb-6 text-shadow">
                  "Every recipe in my kitchen had a story, but I never wrote them down. Before I Go helped me create a cookbook that's really a love story - about my mother, my marriage, and the meals that brought us together."
                </blockquote>
                
                <p className="opacity-90 leading-relaxed">
                  Sarah's "Kitchen Chronicles" became more than a cookbook. It became a bridge connecting four generations, 
                  with stories of resilience during the Great Depression, celebrations during good times, and the simple 
                  joy of feeding the people you love.
                </p>
              </div>
              
              <div className="relative group">
                <img 
                  src="/Gemini_Generated_Image_hjq8rohjq8rohjq8.jpeg" 
                  alt="Recipe book and family photos"
                  className="rounded-2xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute -bottom-6 -right-6 bg-white text-slate-800 p-6 rounded-2xl shadow-xl">
                  <div className="absolute -bottom-4 -right-4 bg-white text-slate-800 p-4 rounded-2xl shadow-xl">
                    <BookHeart className="h-8 w-8 mb-2 text-rose-600" />
                    <p className="font-semibold text-xs whitespace-nowrap">Now a family treasure</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-warm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-serif text-slate-800 mb-6 text-shadow">
            Your Story Could Be Next
          </h2>
          <p className="text-xl text-slate-600 mb-12 leading-relaxed">
            Join thousands of families who have already created lasting legacies with Before I Go. 
            Your memories are waiting to be shared.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/checkout"
              className="group bg-rose-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-rose-700 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>Start Your Legacy Story</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              to="/demo"
              className="group border-2 border-slate-300 text-slate-700 px-10 py-4 rounded-full text-lg font-semibold hover:border-slate-400 hover:bg-white transition-all duration-300"
            >
              See Demo Stories
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;