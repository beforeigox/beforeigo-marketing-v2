import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Heart, Users, Star, ArrowRight, Play, Clock, Shield, Sparkles, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorks: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: "Choose Your Story",
      description: "Simply select who you are and who this story is for and our smart library will curate you a library of thoughtfully crafted questions designed to unlock your most meaningful memories.",
      image: "/Gemini_Generated_Image_juzthxjuzthxjuzt.png",
      icon: BookOpen,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Share Your Stories",
      description: "Write at your own pace, whether it's a few sentences or several pages. Every story matters, and our prompts help you remember details you thought you'd forgotten.",
      image: "/Gemini_Generated_Image_c42lqic42lqic42l copy.png",
      icon: Heart,
      color: "from-rose-500 to-pink-500"
    },
    {
      title: "Beautiful Design",
      description: "Your stories are transformed into a professionally designed, heirloom-quality book that your family will treasure for generations.",
      image: "/Gemini_Generated_Image_7ej4o67ej4o67ej4 copy copy.png",
      icon: Sparkles,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Share Your Legacy",
      description: "Receive your beautiful book and share copies with family members who will treasure it forever. Your stories become a lasting gift of love.",
      image: "/family1 copy copy.png",
      icon: Users,
      color: "from-emerald-500 to-teal-500"
    }
  ];

  const features = [
    {
      icon: BookOpen,
      title: "200+ Thoughtful Prompts",
      description: "Carefully crafted questions that help you uncover memories you never knew you had.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Clock,
      title: "Work at Your Pace",
      description: "No deadlines, no pressure. Take weeks, months, or even years to complete your story.",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: Shield,
      title: "Private & Secure",
      description: "Your stories are protected with enterprise-grade security and remain completely private.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Heart,
      title: "Family Focused",
      description: "Designed specifically to strengthen family bonds and preserve precious memories.",
      color: "from-rose-500 to-pink-500"
    }
  ];

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % steps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + steps.length) % steps.length);
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="py-20 lg:py-32 bg-gradient-warm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-5xl lg:text-6xl font-serif text-slate-800 mb-6 text-shadow">
              How <span className="gradient-text">Before I Go</span> Works
            </h1>
            <p className="text-xl lg:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Creating your family legacy is simple, meaningful, and completely at your own pace. 
              Here's how we help you preserve your most precious memories.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Steps */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-8 lg:p-12 shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Step Content */}
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-rose-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl shadow-lg">
                    {currentStep + 1}
                  </div>
                  <div>
                    <h2 className="text-3xl font-serif text-slate-900">{steps[currentStep].title}</h2>
                    <div className="flex items-center space-x-2 mt-2">
                      {steps.map((_, index) => (
                        <div
                          key={index}
                          className={`h-2 w-8 rounded-full transition-all duration-300 ${
                            index === currentStep ? 'bg-rose-600' : 'bg-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                
                <p className="text-xl text-slate-600 leading-relaxed mb-8">
                  {steps[currentStep].description}
                </p>

                {/* Navigation Buttons */}
                <div className="flex space-x-4">
                  <button 
                    onClick={prevStep}
                    className="flex items-center space-x-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-full hover:bg-slate-50 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>Previous</span>
                  </button>
                  <button 
                    onClick={nextStep}
                    className="flex items-center space-x-2 px-6 py-3 bg-rose-600 text-white rounded-full hover:bg-rose-700 transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    <span>Next</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {/* Step Image */}
              <div className="relative group">
                <img 
                  src={steps[currentStep].image} 
                  alt={steps[currentStep].title}
                  className="rounded-2xl shadow-2xl max-h-96 object-contain transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gradient-warm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-serif text-slate-800 mb-6 text-shadow">
              Why Families Love Before I Go
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              We've designed every aspect of the experience to make storytelling natural, 
              meaningful, and enjoyable for everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-3xl p-8 shadow-xl hover-lift text-center">
                  <div className={`inline-flex p-4 rounded-2xl mb-6 bg-gradient-to-br ${feature.color}`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-serif text-slate-800 mb-4">{feature.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sample Questions */}

      {/* Testimonial */}
      <section className="py-20 bg-gradient-elegant">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 lg:p-12 border border-white/20">
            <div className="flex items-center justify-center space-x-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-amber-400 fill-current" />
              ))}
            </div>
            <blockquote className="text-2xl lg:text-3xl font-serif text-white mb-8 leading-relaxed text-shadow">
              "Before I Go helped me capture stories I never would have thought to share. 
              My children now have a piece of me they can keep forever."
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <img 
                src="https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=100" 
                alt="Sarah M."
                className="w-12 h-12 rounded-full object-cover border-2 border-white/30"
              />
              <div className="text-left">
                <p className="text-white font-semibold">Sarah M.</p>
                <p className="text-white/80 text-sm">Mother of 3</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-warm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl lg:text-5xl font-serif text-slate-800 mb-6 text-shadow">
            Ready to Start Your Story?
          </h2>
          <p className="text-xl text-slate-600 mb-12 leading-relaxed">
            Join thousands of families who have already created their legacy stories with Before I Go. 
            Your memories are waiting to be preserved.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              to="/checkout"
              className="group bg-rose-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-rose-700 transition-all duration-300 transform hover:scale-105 shadow-lg mx-auto"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>Start Your Legacy Story</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HowItWorks;