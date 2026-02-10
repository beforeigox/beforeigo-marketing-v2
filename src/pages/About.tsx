import React from 'react';
import { BookHeart, Users, Heart, Award, ArrowRight, Quote, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const About: React.FC = () => {
  const stats = [
    { number: "2,500+", label: "Stories Preserved", icon: BookHeart },
    { number: "4,000+", label: "Families Connected", icon: Users },
    { number: "98%", label: "Satisfaction Rate", icon: Star },
    { number: "1 Year", label: "Preserving Legacies", icon: Award }
  ];

  const values = [
    {
      icon: Heart,
      title: "Every Story Matters",
      description: "Whether you're a CEO or a homemaker, your experiences, wisdom, and love have shaped lives. Your story deserves to be preserved with dignity and care.",
      color: "from-rose-500 to-pink-500"
    },
    {
      icon: Users,
      title: "Family First",
      description: "We understand that family relationships are complex and beautiful. Our approach honors all types of families and the unique bonds that connect us.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Award,
      title: "Quality & Care",
      description: "Your memories deserve the highest quality presentation. We craft each book with meticulous attention to detail and genuine care for your story.",
      color: "from-amber-500 to-orange-500"
    }
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-warm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-serif text-slate-800 mb-6 text-shadow">
              Our Mission: <span className="gradient-text">Preserving What Matters Most</span>
            </h1>
            <p className="text-xl lg:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              We believe every life story deserves to be told, remembered, and cherished. 
              Before I Go was born from the understanding that our most precious memories shouldn't fade with time.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center bg-white rounded-2xl p-6 shadow-xl hover-lift">
                  <div className="inline-flex p-3 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl mb-4">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold mb-2 gradient-text">{stat.number}</div>
                  <div className="text-slate-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-serif text-slate-800 mb-6 text-shadow">
                It Started with a Grandmother's Untold Stories
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                When Sarah's grandmother passed away, she realized that decades of wisdom, humor, and life lessons 
                went with her. The recipes, the stories of resilience during hard times, the little moments that 
                made her grandmother who she was—all of it was gone forever.
              </p>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                That's when Sarah knew she had to create something that would ensure no other family would experience 
                this loss. Before I Go was born from love, loss, and the deep understanding that every person's 
                story matters.
              </p>
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl">
                  <BookHeart className="h-8 w-8 text-white" />
                </div>
                <span className="text-lg font-semibold text-slate-800">Every story deserves to be told</span>
              </div>
            </div>
            <div className="relative group">
              <img 
                src="/Gemini_Generated_Image_77n0f877n0f877n0 copy.jpeg" 
                alt="Open book with stories and butterfly representing memories taking flight"
                className="rounded-3xl shadow-2xl transform group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-warm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-serif text-slate-800 mb-6 text-shadow">
              What We Believe
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our values guide everything we do, from the questions we ask to the books we create.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="bg-white rounded-3xl p-8 shadow-xl hover-lift">
                  <div className={`inline-flex p-4 rounded-2xl mb-6 bg-gradient-to-br ${value.color}`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-serif text-slate-800 mb-4">{value.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-elegant">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-serif text-white mb-6 text-shadow">
            Ready to Share Your Story?
          </h2>
          <p className="text-xl text-white/90 mb-12 leading-relaxed">
            Join thousands of families who have already preserved their precious memories with Before I Go.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/checkout"
              className="group bg-white text-rose-600 px-10 py-4 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>Start Your Legacy Story</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              to="/demo"
              className="group border-2 border-white text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-slate-800 transition-all duration-300"
            >
              <span>See How It Works</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;