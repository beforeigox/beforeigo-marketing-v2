import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, BookOpen, Heart, Users, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Demo: React.FC = () => {
  const [selectedPrompt, setSelectedPrompt] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const prompts = [
    {
      title: "First Memories",
      question: "What's the earliest memory you have of your family home?",
      icon: BookOpen,
      category: "Childhood",
      sampleResponse: "I remember the creaky third step on our old wooden staircase. Every night, I'd try to skip over it so I wouldn't wake Mom and Dad when I snuck down for a glass of water. The kitchen always smelled like cinnamon from Mom's morning coffee ritual, and there was this patch of sunlight that would stream through the window and warm the breakfast table every morning at exactly 7:30 AM.",
      tips: "Focus on sensory details - what you saw, heard, smelled, or felt. These details bring memories to life."
    },
    {
      title: "Family Traditions",
      question: "What holiday tradition meant the most to your family growing up?",
      icon: Heart,
      category: "Traditions",
      sampleResponse: "Every Christmas Eve, Dad would read 'The Night Before Christmas' in different silly voices - the mouse squeaked, Santa boomed like a giant, and the reindeer had British accents. We'd giggle until our sides hurt. Even as teenagers, we insisted he continue the tradition. Now I read it to my own children in those same ridiculous voices, and I can see Dad's smile in their laughter.",
      tips: "Explain why this tradition was special and how it made you feel. Include how it has influenced you today."
    },
    {
      title: "Wisdom Shared",
      question: "What's the best piece of advice a family member ever gave you?",
      icon: Star,
      category: "Lessons",
      sampleResponse: "When I was 16 and heartbroken over my first breakup, Grandma sat me down and said, 'Honey, you can't control how others treat you, but you can always control how you treat yourself.' She taught me that self-respect isn't selfish - it's necessary. That advice has guided every major decision I've made since, from choosing friends to building my career.",
      tips: "Share the context of when you received this advice and how it has shaped your life decisions."
    },
    {
      title: "Hidden Stories",
      question: "What family story were you surprised to learn about as an adult?",
      icon: Users,
      category: "Discoveries",
      sampleResponse: "I always knew Mom was strong, but I didn't know she had put herself through nursing school while raising three kids under five. She'd study after we went to bed, sometimes until 2 AM, then wake up at 6 to get us ready for school. She never complained, never made us feel like a burden. Learning this as an adult made me realize that strength isn't always loud - sometimes it's quiet, steady, and incredibly powerful.",
      tips: "Reflect on how learning this story changed your perspective on your family member or yourself."
    }
  ];

  const demoSteps = [
    {
      title: "Choose Your Prompts",
      description: "Select from over 200 thoughtfully crafted questions designed to unlock your most meaningful memories.",
      image: "/Gemini_Generated_Image_n4bkmzn4bkmzn4bk.png"
    },
    {
      title: "Share Your Stories",
      description: "Write at your own pace, whether it's a few sentences or several pages. Every story matters.",
      image: "/Gemini_Generated_Image_vyotpbvyotpbvyot.png"
    },
    {
      title: "Beautiful Design",
      description: "Your stories are transformed into a professionally designed, heirloom-quality book.",
      image: "/Gemini_Generated_Image_lo43nalo43nalo43 copy.png"
    },
    {
      title: "Share Your Legacy",
      description: "Receive your beautiful book and share copies with family members who will treasure it forever.",
      image: "/family1.png"
    }
  ];

  const nextStep = () => {
    setCurrentStep((prev) => (prev + 1) % demoSteps.length);
  };

  const prevStep = () => {
    setCurrentStep((prev) => (prev - 1 + demoSteps.length) % demoSteps.length);
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section with Video */}
      <section className="py-24 lg:py-32 bg-gradient-warm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl lg:text-5xl font-serif text-slate-900 mb-6 leading-tight text-shadow">
              See How It Works
            </h1>

            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed mb-12">
              Experience our guided storytelling process and see how easy it is to create
              a beautiful legacy journal filled with your most precious memories.
            </p>
          </div>

          {/* Demo Video */}
          <div className="relative w-full rounded-xl overflow-hidden shadow-2xl mb-12" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube-nocookie.com/embed/FvmGXWfRyjQ?rel=0&modestbranding=1"
              title="See How It Works - Before I Go Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>

          {/* CTA Button */}
          <div className="text-center">
            <Link
              to="/checkout"
              className="group inline-flex items-center space-x-2 bg-rose-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-rose-700 transition-all duration-300 transform hover:scale-105 shadow-xl"
            >
              <span>Start Your Story</span>
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* Sample Prompts Section */}
      <section className="py-20 bg-gradient-warm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif text-slate-900 mb-4 text-shadow">
              Try Our Story Prompts
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Experience how our thoughtfully crafted questions help unlock your most meaningful memories
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Prompt Selection */}
            <div className="space-y-4">
              {prompts.map((prompt, index) => {
                const Icon = prompt.icon;
                return (
                  <div
                    key={index}
                    className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                      selectedPrompt === index 
                        ? 'bg-rose-600 text-white shadow-xl transform scale-105' 
                        : 'bg-white hover:shadow-lg border border-slate-100'
                    }`}
                    onClick={() => setSelectedPrompt(index)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-xl ${
                        selectedPrompt === index ? 'bg-white/20' : 'bg-rose-50'
                      }`}>
                        <Icon className={`h-5 w-5 ${
                          selectedPrompt === index ? 'text-white' : 'text-rose-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold">{prompt.title}</h3>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            selectedPrompt === index 
                              ? 'bg-white/20 text-white' 
                              : 'bg-rose-50 text-rose-600'
                          }`}>
                            {prompt.category}
                          </span>
                        </div>
                        <p className={`text-sm ${
                          selectedPrompt === index ? 'text-white/90' : 'text-slate-600'
                        }`}>
                          {prompt.question}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Sample Response */}
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h3 className="text-xl font-serif text-slate-900 mb-4">Sample Response</h3>
              <div className="mb-6">
                <h4 className="font-semibold text-rose-600 mb-2">{prompts[selectedPrompt].question}</h4>
                <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl p-6">
                  <p className="text-slate-700 leading-relaxed italic">
                    "{prompts[selectedPrompt].sampleResponse}"
                  </p>
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-4">
                <h5 className="font-semibold text-slate-900 mb-2">💡 Writing Tip:</h5>
                <p className="text-slate-600 text-sm">{prompts[selectedPrompt].tips}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif text-slate-900 mb-4 text-shadow">
              Easy As Pie
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Sharing Memories and Leaving Behind Your Legacy Has Never Been Easier
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-3xl p-8 lg:p-12 shadow-xl">
            {/* Demo Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-rose-600 to-rose-700 text-white rounded-xl flex items-center justify-center font-bold text-lg">
                    {currentStep + 1}
                  </div>
                  <h3 className="text-2xl font-serif text-slate-900">{demoSteps[currentStep].title}</h3>
                </div>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  {demoSteps[currentStep].description}
                </p>
                
                {/* Step Progress */}
                <div className="flex space-x-2 mb-6">
                  {demoSteps.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 flex-1 rounded-full transition-all duration-300 ${
                        index === currentStep ? 'bg-rose-600' : 'bg-slate-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              <div className="relative group">
                <img 
                  src={demoSteps[currentStep].image} 
                  alt={demoSteps[currentStep].title}
                  className="rounded-2xl shadow-2xl w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center space-x-4 mt-8">
              <button 
                onClick={prevStep}
                className="p-3 bg-white hover:bg-slate-50 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <ChevronLeft className="h-5 w-5 text-slate-600" />
              </button>
              <button 
                onClick={nextStep}
                className="p-3 bg-white hover:bg-slate-50 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <ChevronRight className="h-5 w-5 text-slate-600" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-elegant">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-serif text-white mb-6 text-shadow">
            Ready to Create Your Legacy Story?
          </h2>
          <p className="text-lg text-white/90 mb-12 leading-relaxed max-w-2xl mx-auto">
            You've seen how it works. Now it's time to start capturing your own precious memories 
            and creating a beautiful legacy for your family.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/checkout"
              className="group bg-white text-rose-600 px-8 py-4 rounded-full font-medium hover:bg-opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <span className="flex items-center justify-center space-x-2">
                <span>Start Your Story Today</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <Link
              to="/testimonials"
              className="group border border-white text-white px-8 py-4 rounded-full font-medium hover:bg-white hover:text-slate-800 transition-all duration-300"
            >
              Read Success Stories
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Demo;