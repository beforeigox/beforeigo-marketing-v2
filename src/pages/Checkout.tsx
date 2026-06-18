import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, BookHeart, Users, Crown, ArrowRight, Shield, Clock, Heart, X, ChefHat, Sparkles, User, BookOpen, Package } from 'lucide-react';

// ===========================================================================
// Shared style tokens (brand)
// ===========================================================================
const BURGUNDY = '#8f1133';
const BURGUNDY_DARK = '#7a0e2b';
const CREAM = '#FAF7F2';
const INK = '#3A3A3A';
const MUTE = '#6B5B73';
const TILE = '#F5E6EA';
const BORDER = '#EAD7DD';
const serif = { fontFamily: 'Crimson Text, serif' };

// ===========================================================================
// Plans (module scope so types resolve everywhere)
// ===========================================================================
const plans = [
  {
    name: 'The Storyteller',
    subtitle: 'Capture your core memories in a beautiful, lasting format',
    price: 26,
    features: [
      'Guided question sets for any family role',
      'Text-based storytelling with elegant interface',
      'Add up to 50 photos',
      'Beautiful PDF export',
      'Lifetime digital backup',
    ],
    popular: false,
    icon: BookHeart,
  },
  {
    name: 'The Keepsake',
    subtitle: 'A richer personal experience with audio and video',
    price: 35,
    features: [
      'Everything in Storyteller, plus:',
      'Audio recording with voice capture',
      'Up to 250 photos & video clips',
      'Family sharing portal (10 members)',
      'Premium digital copies',
    ],
    popular: true,
    icon: Heart,
  },
  {
    name: 'The Legacy',
    subtitle: 'The ultimate immersive life-story archive',
    price: 44,
    features: [
      'Everything in Keepsake, plus:',
      'AI voice cloning for audiobook narration',
      'AI handwriting font creation',
      'Unlimited photos & videos',
      'AI Story Weaver™ narrative generation',
    ],
    popular: false,
    icon: Crown,
  },
] as const;

type Plan = (typeof plans)[number];

const testimonials = [
  { name: 'Sarah M.', text: "The Keepsake plan was perfect for our family. The audio recordings helped me remember stories I'd completely forgotten." },
  { name: 'Robert K.', text: 'Worth every penny. My children will treasure this forever.' },
  { name: 'Maria L.', text: 'The support team was incredible — they helped me through every step.' },
];

const guarantees = [
  { icon: Shield, title: '30-Day Money Back', description: 'Not satisfied? A full refund within 30 days, no questions.' },
  { icon: Clock, title: 'No Rush, No Pressure', description: 'Take all the time you need to complete your story.' },
  { icon: Heart, title: 'Satisfaction Promise', description: "We'll work with you until you love your journal." },
];

// ===========================================================================
// Recipe upsell modal
// ===========================================================================
interface RecipeUpsellModalProps {
  isOpen: boolean;
  plan: Plan;
  onAccept: () => void;
  onDecline: () => void;
  onClose: () => void;
}

const RecipeUpsellModal: React.FC<RecipeUpsellModalProps> = ({ isOpen, plan, onAccept, onDecline, onClose }) => {
  if (!isOpen) return null;
  const savings = 3;
  const addOnPrice = 5;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="relative max-w-md w-full rounded-3xl overflow-hidden" style={{ boxShadow: '0 25px 50px -12px rgba(143, 17, 51, 0.4)' }}>
        <div className="absolute inset-0 rounded-3xl z-0" style={{ background: 'linear-gradient(135deg, #8f1133, #FAF7F2, #8f1133, #FAF7F2)', backgroundSize: '300% 300%', animation: 'gradientShift 3s ease infinite', padding: '2px' }} />
        <div className="relative z-10 bg-white rounded-3xl overflow-hidden">
          <div className="relative px-8 pt-8 pb-6 text-center" style={{ backgroundColor: BURGUNDY }}>
            <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full text-white opacity-70 hover:opacity-100">
              <X className="h-5 w-5" />
            </button>
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles className="h-5 w-5 text-yellow-300 fill-yellow-300" />
              <span className="text-yellow-300 text-xs font-bold uppercase tracking-widest">One-Time Offer</span>
              <Sparkles className="h-5 w-5 text-yellow-300 fill-yellow-300" />
            </div>
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }}>
              <ChefHat className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-1" style={serif}>Preserve Your Family's Recipes Forever</h2>
            <p className="text-white opacity-80 text-sm">Add your Recipe Book for only ${addOnPrice} — save ${savings} vs. buying separately</p>
          </div>
          <div className="px-8 py-6">
            <ul className="space-y-2 mb-6">
              {['Save unlimited family recipes', 'Add photos to each recipe', 'Organize by category', 'Beautiful printable format', 'Preserve for generations'].map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm" style={{ color: INK }}>
                  <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: TILE }}>
                    <Check className="h-3 w-3" style={{ color: BURGUNDY }} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
            <button onClick={onAccept} className="w-full py-4 rounded-xl font-bold text-white flex items-center justify-center gap-2 mb-3 transition-colors" style={{ backgroundColor: BURGUNDY }}>
              <ChefHat className="h-5 w-5" />
              <span>Add Recipe Book for ${addOnPrice}</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <button onClick={onDecline} className="w-full py-3 text-sm" style={{ color: MUTE }}>
              No thanks, just {plan.name} for ${plan.price}
            </button>
          </div>
        </div>
      </div>
      <style>{`@keyframes gradientShift { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }`}</style>
    </div>
  );
};

// ===========================================================================
// Checkout page
// ===========================================================================
const Checkout: React.FC = () => {
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [showRecipeUpsell, setShowRecipeUpsell] = useState(false);
  const [pendingPlan, setPendingPlan] = useState<Plan | null>(null);

  const handleCheckout = async (plan: Plan, includeRecipe: boolean, skipUpsell = false) => {
    // Upsell only for Storyteller & Keepsake, only when recipe not already chosen
    if ((plan.name === 'The Storyteller' || plan.name === 'The Keepsake') && !includeRecipe && !skipUpsell) {
      setPendingPlan(plan);
      setShowRecipeUpsell(true);
      return;
    }

    setIsProcessing(true);
    try {
      const paymentLinks: Record<string, string> = {
        'The Storyteller': includeRecipe
          ? 'https://buy.stripe.com/8x2cMYe3n4UF2u1d4b3gk06'
          : 'https://buy.stripe.com/28EfZa2kF86Rd8F2px3gk03',
        'The Keepsake': includeRecipe
          ? 'https://buy.stripe.com/8x24gs5wR9aVfgNd4b3gk07'
          : 'https://buy.stripe.com/28E14g8J30Epb0xd4b3gk04',
        'The Legacy': 'https://buy.stripe.com/7sYbIUbVfaeZc4B0hp3gk05',
      };
      const paymentLink = paymentLinks[plan.name];
      if (!paymentLink) throw new Error('Payment link not found');

      const planParam = plan.name.toLowerCase().replace(/\s+/g, '');
      const successUrl = encodeURIComponent(`https://app.beforeigo.app/gift-choice?plan=${planParam}${includeRecipe ? '_recipe' : ''}&session_id={CHECKOUT_SESSION_ID}`);
      window.location.href = `${paymentLink}?prefilled_email={CUSTOMER_EMAIL}&success_url=${successUrl}`;
    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Failed to start checkout. Please try again.');
      setIsProcessing(false);
    }
  };

  const handleRecipeAccept = () => {
    setShowRecipeUpsell(false);
    if (pendingPlan) handleCheckout(pendingPlan, true, true);
  };

  const handleRecipeDecline = () => {
    setShowRecipeUpsell(false);
    if (pendingPlan) handleCheckout(pendingPlan, false, true);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: CREAM }}>
      <RecipeUpsellModal
        isOpen={showRecipeUpsell}
        plan={pendingPlan || plans[0]}
        onAccept={handleRecipeAccept}
        onDecline={handleRecipeDecline}
        onClose={() => setShowRecipeUpsell(false)}
      />

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="h-5 w-5" style={{ color: BURGUNDY }} />
            <span className="text-sm font-bold uppercase tracking-widest" style={{ color: BURGUNDY }}>Before I Go</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4" style={{ ...serif, color: INK }}>
            Choose Your Story Plan
          </h1>
          <p className="text-lg" style={{ color: MUTE }}>
            One-time payment. Lifetime access. No subscriptions.
          </p>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <div
                key={plan.name}
                className="relative bg-white rounded-2xl flex flex-col transition-all duration-300 hover:-translate-y-1"
                style={{
                  border: `2px solid ${plan.popular ? BURGUNDY : BORDER}`,
                  boxShadow: '0 4px 6px -1px rgba(143, 17, 51, 0.08)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 20px 25px -5px rgba(143, 17, 51, 0.18)')}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(143, 17, 51, 0.08)')}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="px-4 py-1 rounded-full text-xs font-semibold text-white" style={{ backgroundColor: BURGUNDY }}>
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="p-8 flex flex-col flex-grow">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5" style={{ backgroundColor: TILE }}>
                    <Icon className="h-7 w-7" style={{ color: BURGUNDY }} />
                  </div>

                  <h3 className="text-2xl font-bold mb-2" style={{ ...serif, color: INK }}>{plan.name}</h3>
                  <p className="text-sm mb-6 leading-snug min-h-[40px]" style={{ color: MUTE }}>{plan.subtitle}</p>

                  <div className="mb-6">
                    <span className="text-4xl font-bold" style={{ color: INK }}>${plan.price}</span>
                    <span className="text-sm ml-2" style={{ color: MUTE }}>one-time</span>
                  </div>

                  <ul className="space-y-3 mb-8 flex-grow">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: TILE }}>
                          <Check className="h-3 w-3" style={{ color: BURGUNDY }} />
                        </div>
                        <span className="text-sm leading-snug" style={{ color: INK }}>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    onClick={() => {
                      setSelectedPlan(plan);
                      handleCheckout(plan, false);
                    }}
                    disabled={isProcessing}
                    className="w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
                    style={{ backgroundColor: BURGUNDY }}
                    onMouseEnter={(e) => !isProcessing && (e.currentTarget.style.backgroundColor = BURGUNDY_DARK)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BURGUNDY)}
                  >
                    {isProcessing && selectedPlan?.name === plan.name ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                        Processing…
                      </>
                    ) : (
                      <>
                        Choose {plan.name.replace('The ', '')}
                        <ArrowRight className="h-5 w-5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Physical Journal */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ ...serif, color: INK }}>Prefer Pen and Paper?</h2>
            <p className="text-lg" style={{ color: MUTE }}>A printed journal for those who'd rather write by hand</p>
          </div>

          <div className="bg-white rounded-3xl overflow-hidden" style={{ border: `1px solid ${BORDER}`, boxShadow: '0 10px 30px -10px rgba(143, 17, 51, 0.15)' }}>
            <div className="md:flex">
              <div className="md:w-2/5 p-10 flex items-center justify-center" style={{ backgroundColor: TILE }}>
                <div className="text-center">
                  <div className="inline-flex p-6 rounded-3xl mb-4" style={{ backgroundColor: BURGUNDY }}>
                    <BookOpen className="h-16 w-16 text-white" />
                  </div>
                  <div className="text-sm font-medium px-4 py-2 rounded-full inline-block" style={{ backgroundColor: 'white', color: BURGUNDY }}>
                    Ships in 3–5 business days
                  </div>
                </div>
              </div>

              <div className="md:w-3/5 p-8">
                <h3 className="text-2xl font-bold mb-3" style={{ ...serif, color: INK }}>Physical Question Journal</h3>
                <p className="mb-6 leading-relaxed" style={{ color: MUTE }}>
                  A beautiful printed journal with all our thoughtful questions, made for anyone who prefers handwriting their memories.
                </p>
                <ul className="space-y-2.5 mb-8">
                  {['72 guided questions for any family role', 'Premium cream pages with space to write', 'Inspirational quotes for each chapter', 'No tech needed — just a pen', 'Available as Paperback or Hardcover'].map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: TILE }}>
                        <Check className="h-3 w-3" style={{ color: BURGUNDY }} />
                      </div>
                      <span className="text-sm" style={{ color: INK }}>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <div className="text-sm" style={{ color: MUTE }}>Starting at</div>
                    <div className="text-3xl font-bold" style={{ color: INK }}>$29</div>
                  </div>
                  <a
                    href="https://buy.stripe.com/4gMaEQ1gBdrbd8F8NV3gk02"
                    className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white transition-colors"
                    style={{ backgroundColor: BURGUNDY }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BURGUNDY_DARK)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BURGUNDY)}
                  >
                    <Package className="h-5 w-5" />
                    <span>Order Journal</span>
                    <ArrowRight className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {[
              { icon: Users, text: 'Perfect for grandparents who prefer handwriting' },
              { icon: Heart, text: 'A gift they can hold in their hands' },
              { icon: BookHeart, text: 'No apps, no passwords — just memories' },
            ].map(({ icon: Ico, text }) => (
              <div key={text} className="bg-white rounded-xl p-6 text-center" style={{ border: `1px solid ${BORDER}` }}>
                <div className="inline-flex w-12 h-12 rounded-xl items-center justify-center mb-3" style={{ backgroundColor: TILE }}>
                  <Ico className="h-6 w-6" style={{ color: BURGUNDY }} />
                </div>
                <p className="text-sm font-medium" style={{ color: INK }}>{text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-center mb-10" style={{ ...serif, color: INK }}>What Families Say</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-7" style={{ border: `1px solid ${BORDER}` }}>
                <p className="mb-5 leading-relaxed italic" style={{ color: INK }}>"{t.text}"</p>
                <p className="text-sm font-semibold" style={{ color: BURGUNDY }}>— {t.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantees */}
        <div className="grid md:grid-cols-3 gap-6">
          {guarantees.map(({ icon: Ico, title, description }) => (
            <div key={title} className="text-center px-6">
              <div className="inline-flex w-14 h-14 rounded-2xl items-center justify-center mb-4" style={{ backgroundColor: TILE }}>
                <Ico className="h-7 w-7" style={{ color: BURGUNDY }} />
              </div>
              <h3 className="text-lg font-bold mb-2" style={{ ...serif, color: INK }}>{title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: MUTE }}>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
