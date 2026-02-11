import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Check, Star, BookHeart, Users, Crown, ArrowRight, Shield, Clock, Heart, X, ChefHat, Sparkles, User, BookOpen, Package } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';

// Modal Components - Defined outside to prevent re-renders
interface RecipientSelectionModalProps {
  isOpen: boolean;
  onForMyself: () => void;
  onForSomeoneElse: () => void;
}

const RecipientSelectionModal: React.FC<RecipientSelectionModalProps> = ({ isOpen, onForMyself, onForSomeoneElse }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden">
        <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 p-8 text-center">
          <div className="inline-flex p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-4">
            <Check className="h-8 w-8 text-white" />
          </div>

          <h2 className="text-2xl font-serif text-slate-900 mb-2">
            Payment Successful!
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Who is this purchase for?
          </p>
        </div>

        <div className="p-8 space-y-4">
          <button
            onClick={onForMyself}
            className="w-full flex items-center justify-between p-6 border-2 border-slate-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-500 transition-colors">
                <User className="h-6 w-6 text-blue-600 group-hover:text-white" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-slate-900">For Myself</div>
                <div className="text-sm text-slate-600">Start creating your story now</div>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-blue-500" />
          </button>

          <button
            onClick={onForSomeoneElse}
            className="w-full flex items-center justify-between p-6 border-2 border-slate-200 rounded-xl hover:border-amber-500 hover:bg-amber-50 transition-all group"
          >
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-amber-100 rounded-xl group-hover:bg-amber-500 transition-colors">
                <Heart className="h-6 w-6 text-amber-600 group-hover:text-white" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-slate-900">For Someone Else (Gift)</div>
                <div className="text-sm text-slate-600">Send this as a gift</div>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-amber-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

interface GiftFormModalProps {
  isOpen: boolean;
  giftEmail: string;
  giftMessage: string;
  onEmailChange: (email: string) => void;
  onMessageChange: (message: string) => void;
  onSend: () => void;
  onCancel: () => void;
}

const GiftFormModal: React.FC<GiftFormModalProps> = ({
  isOpen,
  giftEmail,
  giftMessage,
  onEmailChange,
  onMessageChange,
  onSend,
  onCancel
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden">
        <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 p-8 text-center">
          <button
            onClick={onCancel}
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors p-2 hover:bg-white rounded-full"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="inline-flex p-4 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl mb-4">
            <Heart className="h-8 w-8 text-white" />
          </div>

          <h2 className="text-2xl font-serif text-slate-900 mb-2">
            Send Your Gift
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Enter the recipient's email to send them their Before I Go gift
          </p>
        </div>

        <div className="p-8">
          <div className="space-y-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Recipient's Email
              </label>
              <input
                type="email"
                value={giftEmail}
                onChange={(e) => onEmailChange(e.target.value)}
                placeholder="recipient@example.com"
                autoComplete="email"
                autoFocus
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Personal Message (Optional)
              </label>
              <textarea
                value={giftMessage}
                onChange={(e) => onMessageChange(e.target.value)}
                placeholder="Add a personal message to your gift..."
                rows={3}
                className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors resize-none"
              />
            </div>
          </div>

          <div className="flex space-x-3">
            <button
              onClick={onCancel}
              className="flex-1 bg-slate-200 text-slate-700 py-3 rounded-xl font-medium hover:bg-slate-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onSend}
              className="flex-1 bg-amber-600 text-white py-3 rounded-xl font-semibold hover:bg-amber-700 transition-colors"
            >
              Send Gift
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface GiftSuccessModalProps {
  isOpen: boolean;
  giftEmail: string;
  giftMessage: string;
  onClose: () => void;
}

const GiftSuccessModal: React.FC<GiftSuccessModalProps> = ({ isOpen, giftEmail, giftMessage, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl overflow-hidden">
        <div className="relative bg-gradient-to-br from-green-50 to-emerald-50 p-8 text-center">
          <div className="inline-flex p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-4">
            <Check className="h-12 w-12 text-white" />
          </div>

          <h2 className="text-3xl font-serif text-slate-900 mb-3">
            Gift Sent Successfully!
          </h2>
          <p className="text-slate-600 leading-relaxed text-lg">
            Your gift has been sent to<br />
            <span className="font-semibold text-slate-900">{giftEmail}</span>
          </p>
        </div>

        <div className="p-8">
          <div className="bg-blue-50 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-slate-900 mb-3">What happens next?</h3>
            <ul className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start space-x-2">
                <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>The recipient will receive an email with a special gift link</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>They'll create their account and start their story journey</span>
              </li>
              <li className="flex items-start space-x-2">
                <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>They can begin capturing memories right away</span>
              </li>
            </ul>
          </div>

          {giftMessage && (
            <div className="bg-slate-50 rounded-xl p-4 mb-6">
              <p className="text-sm text-slate-600 mb-1">Your message:</p>
              <p className="text-slate-700 italic">"{giftMessage}"</p>
            </div>
          )}

          <button
            onClick={onClose}
            className="w-full bg-rose-600 text-white py-4 rounded-xl font-semibold hover:bg-rose-700 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
};

const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);
  const [includeRecipeBook, setIncludeRecipeBook] = useState(false);

  // Post-payment flow states
  const [showRecipientSelection, setShowRecipientSelection] = useState(false);
  const [showGiftForm, setShowGiftForm] = useState(false);
  const [showGiftSuccess, setShowGiftSuccess] = useState(false);
  const [giftEmail, setGiftEmail] = useState('');
  const [giftMessage, setGiftMessage] = useState('');
  const [paymentDetails, setPaymentDetails] = useState<{
    plan: typeof plans[0];
    paymentId: string;
    includeRecipe: boolean;
  } | null>(null);

  const plans = [
    {
      name: "The Storyteller",
      subtitle: "Perfect for capturing core memories in a beautiful, lasting format",
      price: 26,
      priceId: "price_1SwerICu1M0mOVHk4sJk5mNv",
      features: [
        "Guided question sets for any family role",
        "Text-based storytelling with elegant interface",
        "Add up to 50 photos",
        "Beautiful PDF export",
        "Lifetime digital backup"
      ],
      popular: false,
      icon: BookHeart,
      color: "slate"
    },
    {
      name: "The Keepsake",
      subtitle: "Richer personal experience with audio and video",
      price: 35,
      priceId: "price_1SwerYCu1M0mOVHkekUfREEd",
      features: [
        "Everything in Storyteller, plus:",
        "Audio recording with voice capture",
        "Up to 250 photos & video clips",
        "Family sharing portal (10 members)",
        "Premium digital copies"
      ],
      popular: true,
      icon: Heart,
      color: "rose"
    },
    {
      name: "The Legacy",
      subtitle: "Ultimate AI-powered immersive life story archive",
      price: 44,
      priceId: "price_1SwesHCu1M0mOVHkOuOkAgio",
      features: [
        "Everything in Keepsake, plus:",
        "AI voice cloning for audiobook narration",
        "AI handwriting font creation",
        "Unlimited photos & videos",
        "AI Story Weaver™ narrative generation"
      ],
      popular: false,
      icon: Crown,
      color: "amber"
    }
  ];

  const testimonials = [
    {
      name: "Sarah M.",
      text: "The Keepsake plan was perfect for our family. The audio recordings helped me remember stories I'd completely forgotten!",
      rating: 5
    },
    {
      name: "Robert K.",
      text: "Worth every penny. My children will treasure this journal forever.",
      rating: 5
    },
    {
      name: "Maria L.",
      text: "The support team was incredible - they helped me through every step of the process.",
      rating: 5
    }
  ];

  const guarantees = [
    {
      icon: Shield,
      title: "30-Day Money Back Guarantee",
      description: "Not satisfied? Get a full refund within 30 days."
    },
    {
      icon: Clock,
      title: "No Rush, No Pressure",
      description: "Take as long as you need to complete your story."
    },
    {
      icon: Heart,
      title: "100% Satisfaction Promise",
      description: "We'll work with you until you love your journal."
    }
  ];

const handleCheckout = async (plan: typeof plans[0], includeRecipe: boolean) => {
  setIsProcessing(true);

  try {
    const paymentLinks: Record<string, string> = {
      "The Storyteller": "https://buy.stripe.com/test_6oU14m48ag6Q1hH0CBbQY02",
      "The Keepsake": "https://buy.stripe.com/test_4gMeVc8oq7Ak4tT0CBbQY01",
      "The Legacy": "https://buy.stripe.com/test_bJe4gyeMO6wg0dD2KJbQY00"
    };

    const paymentLink = paymentLinks[plan.name];
    if (paymentLink) {
      // Redirect to Stripe, which will then redirect to signup after payment
const successUrl = encodeURIComponent(`https://app.beforeigo.app/signup?plan=${encodeURIComponent(plan.name.toLowerCase())}`);
window.location.href = `${paymentLink}?prefilled_email={CUSTOMER_EMAIL}&success_url=${successUrl}`;
    } else {
      throw new Error('Payment link not found');
    }

  } catch (error) {
    console.error('Checkout failed:', error);
    alert('Failed to start checkout. Please try again.');
    setIsProcessing(false);
  }
};

  const handleForMyself = () => {
    if (!paymentDetails) return;

    const params = new URLSearchParams({
      plan: paymentDetails.plan.name.toLowerCase(),
      payment_id: paymentDetails.paymentId,
      recipe_book: paymentDetails.includeRecipe.toString()
    });
    navigate(`/account-setup?${params.toString()}`);
  };

  const handleForSomeoneElse = () => {
    setShowRecipientSelection(false);
    setShowGiftForm(true);
  };

  const handleSendGift = async () => {
    if (!giftEmail) {
      alert('Please enter recipient email address');
      return;
    }

    // In production, this would send an email via backend API
    // Gift link would be: https://beforeigo.app/gift-access?token=...
    const giftLink = `${window.location.origin}/gift-access?token=gift_${Date.now()}`;

    console.log('Mock sending gift email:', {
      to: giftEmail,
      message: giftMessage,
      gift_link: giftLink,
      production_link: `https://beforeigo.app/gift-access?token=gift_${Date.now()}`
    });

    // Show success modal
    setShowGiftForm(false);
    setShowGiftSuccess(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Modals */}
      <RecipientSelectionModal
        isOpen={showRecipientSelection}
        onForMyself={handleForMyself}
        onForSomeoneElse={handleForSomeoneElse}
      />
      <GiftFormModal
        isOpen={showGiftForm}
        giftEmail={giftEmail}
        giftMessage={giftMessage}
        onEmailChange={setGiftEmail}
        onMessageChange={setGiftMessage}
        onSend={handleSendGift}
        onCancel={() => setShowGiftForm(false)}
      />
      <GiftSuccessModal
        isOpen={showGiftSuccess}
        giftEmail={giftEmail}
        giftMessage={giftMessage}
        onClose={() => navigate('/')}
      />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">
            Choose Your Story Plan
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            One-time payment. Lifetime access. No subscriptions.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon;
            const isSelected = selectedPlan?.name === plan.name;
            
            return (
              <div
                key={plan.name}
                className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 flex flex-col ${
                  plan.popular
                    ? 'border-rose-200 ring-2 ring-rose-100'
                    : isSelected
                    ? 'border-blue-300 ring-2 ring-blue-100'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="p-8 flex flex-col flex-grow">
                  <div className="flex items-center justify-center mb-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${
                      plan.color === 'rose' ? 'from-rose-500 to-pink-500' :
                      plan.color === 'amber' ? 'from-amber-500 to-orange-500' :
                      'from-slate-500 to-slate-600'
                    }`}>
                      <IconComponent className="h-7 w-7 text-white" />
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 text-center mb-3">
                    {plan.name}
                  </h3>

                  <p className="text-sm text-slate-600 text-center mb-6 leading-snug min-h-[40px]">
                    {plan.subtitle}
                  </p>

                  <div className="text-center mb-8">
                    <div className="text-5xl font-bold text-slate-900 mb-1">${plan.price}</div>
                    <div className="text-sm text-slate-500">one-time payment</div>
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-4 w-4 text-green-500 mt-1 mr-2 flex-shrink-0" />
                        <span className="text-slate-700 text-sm leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => {
                      setSelectedPlan(plan);
                      handleCheckout(plan, includeRecipeBook);
                    }}
                    disabled={isProcessing}
                    className={`w-full py-4 rounded-xl font-semibold transition-all duration-200 ${
                      plan.popular
                        ? 'bg-gradient-to-r from-rose-600 to-pink-600 text-white hover:from-rose-700 hover:to-pink-700 shadow-lg hover:shadow-xl'
                        : 'bg-slate-900 text-white hover:bg-slate-800'
                    } ${isProcessing ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {isProcessing && selectedPlan?.name === plan.name ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      <>
                        Choose {plan.name}
                        <ArrowRight className="inline-block ml-2 h-5 w-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Physical Journal Section */}
        <div className="max-w-4xl mx-auto mb-16 transform scale-90 origin-top">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-3">
              Not Ready to Go Digital?
            </h2>
            <p className="text-lg text-slate-600">
              Perfect for those who prefer pen and paper
            </p>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl shadow-xl overflow-hidden border-2 border-amber-200">
            <div className="md:flex">
              {/* Image/Visual Side */}
              <div className="md:w-2/5 bg-gradient-to-br from-amber-100 to-orange-100 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-flex p-6 bg-gradient-to-br from-amber-600 to-orange-600 rounded-3xl shadow-2xl mb-4">
                    <BookOpen className="h-20 w-20 text-white" />
                  </div>
                  <div className="text-sm font-medium text-amber-900 bg-white/70 backdrop-blur-sm px-4 py-2 rounded-full inline-block">
                    Ships in 3-5 business days
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="md:w-3/5 p-8">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  Physical Question Journal
                </h3>
                <p className="text-slate-700 mb-6 leading-relaxed">
                  A beautiful printed journal with all our thoughtful questions, designed for anyone who prefers handwriting their memories.
                </p>

                <ul className="space-y-3 mb-8">
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-slate-700">72 guided questions for any family role</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-slate-700">Premium cream pages with space to write</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-slate-700">Inspirational quotes for each chapter</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-slate-700">No tech needed—just a pen and your memories</span>
                  </li>
                  <li className="flex items-start">
                    <Check className="h-5 w-5 text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                    <span className="text-slate-700">Available as Paperback or Hardcover</span>
                  </li>
                </ul>

                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-sm text-slate-600 mb-1">Starting at</div>
                    <div className="text-3xl font-bold text-slate-900">$29</div>
                  </div>
                  <button
                    onClick={() => navigate('/physical-journal')}
                    className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-amber-700 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl flex items-center space-x-2"
                  >
                    <Package className="h-5 w-5" />
                    <span>Order Physical Journal</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>

                <p className="text-xs text-slate-500 italic">
                  Printed on-demand and shipped directly to you. Each journal is custom-made for the role you choose.
                </p>
              </div>
            </div>
          </div>

          {/* Benefits row */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <div className="inline-flex p-3 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl mb-2">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <p className="text-sm text-slate-700 font-medium">Perfect for grandparents who prefer handwriting</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <div className="inline-flex p-3 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl mb-2">
                <Heart className="h-8 w-8 text-amber-600" />
              </div>
              <p className="text-sm text-slate-700 font-medium">Give a gift they can hold in their hands</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md text-center">
              <div className="inline-flex p-3 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl mb-2">
                <BookHeart className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-sm text-slate-700 font-medium">No apps, no passwords—just memories</p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-serif text-slate-900 text-center mb-8">
            What Our Customers Say
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-slate-700 mb-4 italic">"{testimonial.text}"</p>
                <p className="font-semibold text-slate-900">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantees */}
        <div className="grid md:grid-cols-3 gap-8">
          {guarantees.map((guarantee, index) => {
            const IconComponent = guarantee.icon;
            return (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="inline-flex p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-4">
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {guarantee.title}
                </h3>
                <p className="text-slate-600">
                  {guarantee.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Checkout;