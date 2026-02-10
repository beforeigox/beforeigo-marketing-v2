import React, { useState } from 'react';
import { ChevronDown, ChevronUp, MessageCircle, Mail, Phone, BookOpen, Clock, Shield, Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Help: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      question: "How does Before I Go work?",
      answer: "Before I Go guides you through a simple 4-step process: First, you choose from over 200 thoughtfully crafted story prompts. Then, you write your responses at your own pace - whether that's a few sentences or several pages. Next, our design team transforms your stories into a beautiful, professionally designed book. Finally, you receive your heirloom-quality legacy book to share with your family."
    },
    {
      question: "What kind of prompts do you provide?",
      answer: "Our prompts cover all aspects of life: childhood memories, family traditions, life lessons, career highlights, love stories, challenges overcome, cultural heritage, and wisdom you want to pass down. Each prompt is designed by our Chief Story Officer, a former family therapist, to help you uncover meaningful memories you might not have thought to share."
    },
    {
      question: "How long does it take to complete my story?",
      answer: "There's no rush! Most people take 2-6 months to complete their story, writing a little bit each week. You can work at your own pace - some finish in a few weeks, others take a year. Your account remains active until you're ready to publish your book."
    },
    {
      question: "What if I'm not a good writer?",
      answer: "You don't need to be a professional writer! Our prompts are designed to help anyone share their stories naturally. We provide writing tips and examples with each prompt. Remember, your family wants to hear your voice and your perspective - authenticity matters more than perfect grammar."
    },
    {
      question: "Can I include photos in my book?",
      answer: "Absolutely! You can upload photos throughout your storytelling process. Our design team will beautifully integrate them into your book layout. We recommend high-resolution images for the best print quality."
    },
    {
      question: "How many copies of my book will I receive?",
      answer: "This depends on your chosen package. Our Starter package includes 3 copies, Premium includes 5 copies, and Legacy includes 10 copies. You can always order additional copies later at a discounted rate."
    }
  ];

  const supportOptions = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Get instant help from our support team",
      action: "Start Chat",
      available: "Available 24/7",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us a detailed message",
      action: "Send Email",
      available: "Response within 24 hours",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our team",
      action: "Call Now",
      available: "(555) 123-4567",
      color: "from-purple-500 to-pink-500"
    }
  ];

  const resources = [
    {
      icon: BookOpen,
      title: "Writing Guide",
      description: "Tips and techniques for capturing your best stories",
      color: "from-rose-500 to-pink-500"
    },
    {
      icon: Clock,
      title: "Getting Started",
      description: "Step-by-step guide to begin your legacy story",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "How we protect your stories and personal information",
      color: "from-emerald-500 to-teal-500"
    },
    {
      icon: Heart,
      title: "Inspiration Gallery",
      description: "Sample stories and prompts to spark your creativity",
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
              We're Here to <span className="gradient-text">Help You</span>
            </h1>
            <p className="text-xl lg:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
              Creating your legacy story should be a joyful experience. Find answers to common questions 
              or get personalized support from our caring team.
            </p>
          </div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-serif text-slate-800 mb-6 text-shadow">
              Get Support
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Choose the support option that works best for you
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {supportOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <div key={index} className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-8 text-center shadow-xl hover-lift">
                  <div className={`inline-flex p-4 rounded-2xl mb-6 bg-gradient-to-br ${option.color}`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-serif text-slate-800 mb-4">{option.title}</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">{option.description}</p>
                  <button className="bg-rose-600 text-white px-6 py-3 rounded-full hover:bg-rose-700 transition-all duration-300 font-semibold mb-4 transform hover:scale-105">
                    {option.action}
                  </button>
                  <p className="text-sm text-slate-500">{option.available}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-warm">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-serif text-slate-800 mb-6 text-shadow">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600">
              Find quick answers to the most common questions about Before I Go
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-xl overflow-hidden hover-lift">
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-slate-50 transition-all duration-300"
                >
                  <h3 className="text-lg font-serif text-slate-800 pr-4">{faq.question}</h3>
                  {openFaq === index ? (
                    <ChevronUp className="h-5 w-5 flex-shrink-0 text-rose-600" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-slate-400 flex-shrink-0" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-8 pb-6">
                    <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-serif text-slate-800 mb-6 text-shadow">
              Helpful Resources
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Everything you need to create an amazing legacy story
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {resources.map((resource, index) => {
              const Icon = resource.icon;
              return (
                <div key={index} className="text-center p-6 rounded-2xl hover:bg-slate-50 transition-all duration-300 cursor-pointer hover-lift">
                  <div className={`inline-flex p-4 rounded-2xl mb-4 bg-gradient-to-br ${resource.color}`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-serif text-slate-800 mb-3">{resource.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{resource.description}</p>
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
            Still Have Questions?
          </h2>
          <p className="text-xl text-white/90 mb-12 leading-relaxed">
            Our friendly support team is here to help you every step of the way. 
            Don't hesitate to reach out - we love helping families preserve their precious memories.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button className="group bg-white text-rose-600 px-10 py-4 rounded-full text-lg font-semibold hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg">
              Contact Support
            </button>
            <Link
              to="/checkout"
              className="group border-2 border-white text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-slate-800 transition-all duration-300"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>Start Your Story</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Help;