import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ArrowRight, ArrowLeft, BookOpen, Package, MapPin, Mail, User as UserIcon, Home, Phone } from 'lucide-react';

type Step = 'role' | 'format' | 'shipping';
type Role = 'Mom' | 'Dad' | 'Grandma' | 'Grandpa' | 'Son' | 'Daughter' | 'Aunt/Uncle' | 'Sibling';
type Format = 'paperback' | 'hardcover';

interface ShippingInfo {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
}

const PhysicalJournal: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<Step>('role');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [selectedFormat, setSelectedFormat] = useState<Format | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingInfo, setShippingInfo] = useState<ShippingInfo>({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    phone: ''
  });

  const roles: { value: Role; emoji: string; description: string }[] = [
    { value: 'Mom', emoji: '👩', description: 'Questions for mothers to share their journey' },
    { value: 'Dad', emoji: '👨', description: 'Questions for fathers to share their wisdom' },
    { value: 'Grandma', emoji: '👵', description: 'Questions for grandmothers to share family history' },
    { value: 'Grandpa', emoji: '👴', description: 'Questions for grandfathers to share their stories' },
    { value: 'Son', emoji: '👦', description: 'Questions for sons to document their experiences' },
    { value: 'Daughter', emoji: '👧', description: 'Questions for daughters to capture their memories' },
    { value: 'Aunt/Uncle', emoji: '👨‍👩', description: 'Questions for aunts and uncles to share their perspective' },
    { value: 'Sibling', emoji: '👫', description: 'Questions for siblings to remember together' }
  ];

  const formats = [
    {
      type: 'paperback' as Format,
      name: 'Paperback',
      price: 29,
      priceId: 'price_paperback_journal',
      description: 'Soft cover, perfect bound',
      features: ['Premium cream paper', 'Durable soft cover', 'Easy to write in']
    },
    {
      type: 'hardcover' as Format,
      name: 'Hardcover',
      price: 55,
      priceId: 'price_hardcover_journal',
      description: 'Deluxe edition with hard cover',
      features: ['Premium cream paper', 'Elegant hard cover', 'Heirloom quality', 'Ribbon bookmark']
    }
  ];

  const handleRoleSelect = (role: Role) => {
    setSelectedRole(role);
    setCurrentStep('format');
  };

  const handleFormatSelect = (format: Format) => {
    setSelectedFormat(format);
    setCurrentStep('shipping');
  };

  const handleBack = () => {
    if (currentStep === 'format') {
      setCurrentStep('role');
    } else if (currentStep === 'shipping') {
      setCurrentStep('format');
    }
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedRole || !selectedFormat) return;

    const selectedFormatDetails = formats.find(f => f.type === selectedFormat);
    if (!selectedFormatDetails) return;

    setIsProcessing(true);

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
      const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

      const response = await fetch(`${supabaseUrl}/functions/v1/create-checkout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          priceId: selectedFormatDetails.priceId,
          successUrl: `${window.location.origin}/success?session_id={CHECKOUT_SESSION_ID}&type=physical-journal`,
          metadata: {
            product_type: 'physical_journal',
            role: selectedRole,
            format: selectedFormat,
            ...shippingInfo
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { url } = await response.json();

      if (url) {
        window.location.href = url;
      } else {
        throw new Error('No checkout URL returned');
      }

    } catch (error) {
      console.error('Checkout failed:', error);
      alert('Failed to start checkout. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const updateShippingInfo = (field: keyof ShippingInfo, value: string) => {
    setShippingInfo(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-slate-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex p-4 bg-gradient-to-br from-amber-600 to-orange-600 rounded-3xl shadow-xl mb-6">
            <BookOpen className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">
            Physical Question Journal
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            The analog way to preserve your legacy—no tech needed, just pen and paper
          </p>
        </div>

        {/* Progress Steps */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center space-x-4">
            <div className={`flex items-center ${currentStep === 'role' ? 'text-amber-600' : currentStep === 'format' || currentStep === 'shipping' ? 'text-green-600' : 'text-slate-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${currentStep === 'role' ? 'bg-amber-600 text-white' : currentStep === 'format' || currentStep === 'shipping' ? 'bg-green-600 text-white' : 'bg-slate-200'}`}>
                {currentStep === 'format' || currentStep === 'shipping' ? <Check className="h-5 w-5" /> : '1'}
              </div>
              <span className="ml-2 font-medium hidden sm:inline">Choose Role</span>
            </div>
            <div className={`w-12 h-0.5 ${currentStep === 'format' || currentStep === 'shipping' ? 'bg-green-600' : 'bg-slate-300'}`}></div>
            <div className={`flex items-center ${currentStep === 'format' ? 'text-amber-600' : currentStep === 'shipping' ? 'text-green-600' : 'text-slate-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${currentStep === 'format' ? 'bg-amber-600 text-white' : currentStep === 'shipping' ? 'bg-green-600 text-white' : 'bg-slate-200'}`}>
                {currentStep === 'shipping' ? <Check className="h-5 w-5" /> : '2'}
              </div>
              <span className="ml-2 font-medium hidden sm:inline">Choose Format</span>
            </div>
            <div className={`w-12 h-0.5 ${currentStep === 'shipping' ? 'bg-amber-600' : 'bg-slate-300'}`}></div>
            <div className={`flex items-center ${currentStep === 'shipping' ? 'text-amber-600' : 'text-slate-400'}`}>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${currentStep === 'shipping' ? 'bg-amber-600 text-white' : 'bg-slate-200'}`}>
                3
              </div>
              <span className="ml-2 font-medium hidden sm:inline">Shipping</span>
            </div>
          </div>
        </div>

        {/* Step 1: Role Selection */}
        {currentStep === 'role' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
                Who is this journal for?
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {roles.map((role) => (
                  <button
                    key={role.value}
                    onClick={() => handleRoleSelect(role.value)}
                    className="flex items-start p-6 border-2 border-slate-200 rounded-xl hover:border-amber-500 hover:bg-amber-50 transition-all text-left group"
                  >
                    <div className="text-4xl mr-4">{role.emoji}</div>
                    <div>
                      <div className="font-semibold text-slate-900 text-lg mb-1">{role.value}</div>
                      <div className="text-sm text-slate-600">{role.description}</div>
                    </div>
                    <ArrowRight className="ml-auto h-5 w-5 text-slate-400 group-hover:text-amber-600 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
            <div className="text-center">
              <button
                onClick={() => navigate('/checkout')}
                className="text-slate-600 hover:text-slate-900 transition-colors"
              >
                ← Back to Digital Plans
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Format Selection */}
        {currentStep === 'format' && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">
                Choose Your Format
              </h2>
              <p className="text-slate-600 text-center mb-8">
                Selected role: <span className="font-semibold text-amber-600">{selectedRole}</span>
              </p>
              <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
                {formats.map((format) => (
                  <div
                    key={format.type}
                    className={`border-2 rounded-2xl p-6 transition-all cursor-pointer ${
                      selectedFormat === format.type
                        ? 'border-amber-500 bg-amber-50 ring-2 ring-amber-200'
                        : 'border-slate-200 hover:border-amber-300'
                    }`}
                    onClick={() => handleFormatSelect(format.type)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-slate-900">{format.name}</h3>
                      <div className="text-2xl font-bold text-amber-600">${format.price}</div>
                    </div>
                    <p className="text-slate-600 text-sm mb-4">{format.description}</p>
                    <ul className="space-y-2">
                      {format.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start text-sm">
                          <Check className="h-4 w-4 text-green-500 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-slate-700">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleFormatSelect(format.type);
                      }}
                      className={`w-full mt-6 py-3 rounded-xl font-semibold transition-all ${
                        selectedFormat === format.type
                          ? 'bg-amber-600 text-white'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {selectedFormat === format.type ? 'Selected' : 'Select'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="text-center">
              <button
                onClick={handleBack}
                className="text-slate-600 hover:text-slate-900 transition-colors flex items-center justify-center mx-auto"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Role Selection
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Shipping & Checkout */}
        {currentStep === 'shipping' && (
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">
                Shipping Information
              </h2>
              <div className="bg-amber-50 rounded-xl p-4 mb-6 text-center">
                <p className="text-sm text-slate-700">
                  <span className="font-semibold text-amber-600">{selectedRole}</span> journal • {selectedFormat === 'paperback' ? 'Paperback' : 'Hardcover'} • ${formats.find(f => f.type === selectedFormat)?.price}
                </p>
              </div>

              <form onSubmit={handleCheckout} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <UserIcon className="inline h-4 w-4 mr-1" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={shippingInfo.name}
                    onChange={(e) => updateShippingInfo('name', e.target.value)}
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <Mail className="inline h-4 w-4 mr-1" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={shippingInfo.email}
                    onChange={(e) => updateShippingInfo('email', e.target.value)}
                    placeholder="john@example.com"
                    required
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    <Home className="inline h-4 w-4 mr-1" />
                    Street Address
                  </label>
                  <input
                    type="text"
                    value={shippingInfo.address}
                    onChange={(e) => updateShippingInfo('address', e.target.value)}
                    placeholder="123 Main Street"
                    required
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.city}
                      onChange={(e) => updateShippingInfo('city', e.target.value)}
                      placeholder="New York"
                      required
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.state}
                      onChange={(e) => updateShippingInfo('state', e.target.value)}
                      placeholder="NY"
                      required
                      maxLength={2}
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      <MapPin className="inline h-4 w-4 mr-1" />
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      value={shippingInfo.zip}
                      onChange={(e) => updateShippingInfo('zip', e.target.value)}
                      placeholder="10001"
                      required
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      <Phone className="inline h-4 w-4 mr-1" />
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={shippingInfo.phone}
                      onChange={(e) => updateShippingInfo('phone', e.target.value)}
                      placeholder="(555) 123-4567"
                      required
                      className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-colors"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-4 mt-6">
                  <div className="flex items-start space-x-2">
                    <Package className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-slate-900 mb-1">Estimated Delivery</p>
                      <p className="text-sm text-slate-600">5-7 business days after order. You'll receive tracking info via email.</p>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-4 mt-8">
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={isProcessing}
                    className="flex-1 bg-slate-200 text-slate-700 py-4 rounded-xl font-medium hover:bg-slate-300 transition-colors disabled:opacity-50"
                  >
                    <ArrowLeft className="inline h-5 w-5 mr-2" />
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 text-white py-4 rounded-xl font-semibold hover:from-amber-700 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 flex items-center justify-center"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        Proceed to Payment
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhysicalJournal;
