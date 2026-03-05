import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2, Check, User, Mail, Building, Phone, MessageSquare, Calendar } from 'lucide-react';

export default function DemoPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    goal: '',
  });
  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'sending' | 'success'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.company) {
      console.error('Please fill all required fields');
      return;
    }
    
    setFormStatus('sending');
    
    // Simulate a network request
    setTimeout(() => {
      setFormStatus('success');
      // Redirect to thank you page or a demo confirmation page
      setTimeout(() => {
        navigate('/thank-you'); // Let's reuse the thank you page for this
      }, 2000);
    }, 2000);
  };

  const getButtonContent = () => {
    if (formStatus === 'sending') {
      return (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Submitting...
        </>
      );
    }
    if (formStatus === 'success') {
      return (
        <>
          <Check className="mr-2 h-5 w-5" />
          Request Received!
        </>
      );
    }
    return (
      <>
        <Calendar className="mr-2 h-5 w-5" />
        Book Your Free Demo
      </>
    );
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>

        <div className="bg-white shadow-2xl rounded-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-blue-600 to-indigo-600 p-8 text-white">
            <div className="flex items-center justify-center mb-4">
              <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                <Calendar className="w-8 h-8" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-center">Get a Free Demo</h1>
            <p className="text-center text-blue-100 mt-2">
              See how ChatFlow AI can automate your business.
            </p>
          </div>

          {/* Form */}
          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name*
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Work Email*
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@company.com"
                    required
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name*
                </label>
                <div className="relative">
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Acme Inc."
                    required
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <Building className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Goal */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What do you want to achieve?
                </label>
                <div className="relative">
                  <textarea
                    name="goal"
                    value={formData.goal}
                    onChange={handleChange}
                    placeholder="e.g., Automate bookings, reduce customer wait time..."
                    rows="3"
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg bg-white text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={formStatus === 'sending' || formStatus === 'success'}
                className={`
                  w-full mt-6 bg-linear-to-r from-blue-600 to-indigo-600 text-white font-semibold py-4 rounded-lg shadow-lg 
                  transition-all duration-300 flex items-center justify-center gap-2
                  ${formStatus === 'sending' && 'opacity-70 cursor-not-allowed'}
                  ${formStatus === 'success' && 'bg-linear-to-r from-green-500 to-green-600 cursor-not-allowed'}
                  ${formStatus === 'idle' && 'hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl'}
                `}
              >
                {getButtonContent()}
              </button>

              <p className="text-xs text-center text-gray-500 mt-4">
                By submitting this form, you agree to our 
                <Link to="/privacy" className="text-blue-600 hover:underline"> Privacy Policy</Link>.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
