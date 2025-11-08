import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePlan } from "../../context/PlaneContext";
import { CreditCard, Lock, ArrowLeft, CheckCircle, ScanLine } from "lucide-react";
// Removed redundant index.css import

const Payment = () => {
  const { selectedPlan } = usePlan();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  // 2. Add state for payment method
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    upiId: "" // 3. Add upiId to form state
  });

  useEffect(() => {
    // If no plan selected, redirect to home after a short delay
    if (!selectedPlan) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [selectedPlan, navigate]);

  // Show loading state while redirecting
  if (!selectedPlan) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Redirecting to home...</p>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    
    // 4. Update validation logic
    if (!formData.fullName || !formData.email) {
      console.error("Please fill in Name and Email");
      return;
    }

    if (paymentMethod === 'card' && (!formData.cardNumber || !formData.expiry || !formData.cvv)) {
      console.error("Please fill in all card details");
      return;
    }

    if (paymentMethod === 'upi' && !formData.upiId) {
      console.error("Please fill in your UPI ID");
      return;
    }
    // --- End of validation update ---

    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      
      // --- ADDED: Payment Fail Simulation ---
      // If the CVV is '999', navigate to the failed page
      if (paymentMethod === 'card' && formData.cvv === '999') {
        navigate("/payment-failed");
      } else {
        // Otherwise, navigate to the success page
        navigate("/thank-you");
      }
      // --- END: Payment Fail Simulation ---

    }, 2000);
  };

  // --- THIS IS THE FIX ---
  // We check 'selectedPlan.isAnnual' (which we passed from PricingCard)
  // Then we get the correct string ('₹4,990' or '₹499')
  // Then we remove '₹' and ',' before converting to a number
  const priceString = selectedPlan.isAnnual
    ? selectedPlan.price.annual
    : selectedPlan.price.monthly;
    
  const basePrice = parseFloat(priceString.replace('₹', '').replace(',', ''));
  const tax = basePrice * 0.18; // 18% GST
  const total = basePrice + tax;
  const billingCycle = selectedPlan.isAnnual ? 'Annually' : 'Monthly';
  // --- END OF FIX ---

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-blue-600 to-indigo-600 p-8 text-white">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                <Lock className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-center">Secure Payment</h1>
            <p className="text-center text-blue-100 mt-2">
              Complete your subscription to ChatFlow AI
            </p>
          </div>

          <div className="p-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Payment Form */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Payment Details
              </h2>

              {/* 5. Add Payment Method Toggle */}
              <div className="grid grid-cols-2 gap-2 mb-6">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
                    paymentMethod === 'card'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <CreditCard className="w-5 h-5" />
                  <span className="font-medium">Credit/Debit Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg border transition-all duration-200 ${
                    paymentMethod === 'upi'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <ScanLine className="w-5 h-5" /> {/* Using ScanLine for UPI */}
                  <span className="font-medium">UPI</span>
                </button>
              </div>
              {/* --- End of Toggle --- */}


              <form onSubmit={handlePayment} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700  mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="john@example.com"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>

                {/* 6. Conditional Rendering for Payment Fields */}
                {paymentMethod === 'card' && (
                  <>
                    {/* Card Number */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          maxLength="19"
                          required={paymentMethod === 'card'} // Required only for card
                          className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                        <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      </div>
                    </div>

                    {/* Expiry and CVV */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          name="expiry"
                          value={formData.expiry}
                          onChange={handleInputChange}
                          placeholder="MM/YY"
                          maxLength="5"
                          required={paymentMethod === 'card'} // Required only for card
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          placeholder="123"
                          maxLength="3"
                          required={paymentMethod === 'card'} // Required only for card
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>
                    {/* ADDED: Helper text for testing the fail-state */}
                    <p className="text-xs text-gray-500 -mt-2">
                      Demo: Use CVV <code className="font-mono bg-gray-200 p-1 rounded">999</code> to see the payment failed page.
                    </p>
                  </>
                )}

                {paymentMethod === 'upi' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      UPI ID
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        name="upiId"
                        value={formData.upiId}
                        onChange={handleInputChange}
                        placeholder="yourname@bank"
                        required={paymentMethod === 'upi'} // Required only for UPI
                        className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      />
                      <ScanLine className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    </div>
                  </div>
                )}
                {/* --- End of Conditional Rendering --- */}


                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full mt-6 bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      Pay ₹{total.toFixed(2)}
                    </>
                  )}
                </button>

                <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
                  🔒 Your payment information is encrypted and secure
                </p>
              </form>
            </div>

            {/* Right Column - Order Summary */}
            <div>
              <div className="bg-gray-50  rounded-xl p-6 sticky top-8">
                <h3 className="text-xl font-bold text-gray-900  mb-6">
                  Order Summary
                </h3>

                {/* Plan Details */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-gray-900 text-lg">
                        {selectedPlan.name}
                      </p>
                      <p className="text-sm text-gray-600 mt-1">
                        {selectedPlan.desc || "ChatFlow AI Subscription"}
                      </p>
                    </div>
                  </div>

                  {/* Features List */}
                  {selectedPlan.features && (
                    <div className="border-t border-gray-200  pt-4 mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-3">
                        Included features:
                      </p>
                      <ul className="space-y-2">
                        {selectedPlan.features.slice(0, 5).map((feature, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{basePrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>GST (18%)</span>
                    <span>₹{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-gray-900 pt-3 border-t border-gray-200">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Billing Info */}
                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-900 font-medium">
                    {/* FIXED: Made this text dynamic */}
                    Billed {billingCycle}
                  </p>
                  <p className="text-xs text-blue-700 mt-1">
                    Cancel anytime. No commitments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Security Badges */}
        <div className="mt-8 flex items-center justify-center gap-6 text-gray-500">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            <span className="text-sm">SSL Encrypted</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm">PCI Compliant</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;


