import React, { useEffect } from 'react';
// 1. Import hooks
import { Link, useNavigate } from 'react-router-dom';
// 2. Fixed typo: PlaneContext -> PlanContext
import { usePlan } from '../../context/PlaneContext';
import { FaCheckCircle, FaArrowRight } from 'react-icons/fa';

// 2. REMOVE hard-coded purchaseDetails

export default function ThankYouPage() {
  const navigate = useNavigate();
  // 3. Get plan from context
  const { selectedPlan } = usePlan();

  // 4. FIX: Redirect if no plan is selected
  useEffect(() => {
    // Fixed: Replaced placeholder comment with the correct logic
    if (!selectedPlan) {
      navigate('/'); // Go to home page if no purchase was made
    }
  }, [selectedPlan, navigate]);

  // 5. Don't render if we're redirecting
  if (!selectedPlan) {
    return null;
  }

  // 6. Calculate details from context
  const planPrice = selectedPlan.isAnnual 
    ? parseFloat(selectedPlan.price.annual.replace('₹', '').replace(',', ''))
    : parseFloat(selectedPlan.price.monthly.replace('₹', ''));
  
  const taxRate = 0.18;
  const tax = planPrice * taxRate;
  const total = planPrice + tax;
  const billingCycle = selectedPlan.isAnnual ? 'Annual' : 'Monthly';
  const userEmail = "pawan@example.com"; // This would come from your form/auth state

  return (
    <div className="min-h-screen bg-gray-50 antialiased">

      {/* Main Content */}
      <main className="container mx-auto max-w-2xl px-6 py-16 text-center">
        
        {/* The Card */}
        <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-lg md:p-12">
          
          <FaCheckCircle className="mx-auto h-16 w-16 text-green-500" />
          
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900">
            Payment Successful!
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Thank you for your purchase. We've sent a receipt to 
            <strong className="text-gray-800"> {userEmail}</strong>.
          </p>

          {/* 7. Order Summary (Dynamic) */}
          <div className="mt-8 rounded-lg border border-gray-200 bg-gray-50 p-6 text-left">
            <h3 className="text-lg font-semibold text-gray-900">Order Summary</h3>
            <div className="mt-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Plan:</span>
                <span className="font-medium text-gray-900">{selectedPlan.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Billing:</span>
                <span className="font-medium text-gray-900">{billingCycle}</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-3">
                <span className="text-lg font-bold text-gray-900">Total Paid:</span>
                <span className="text-lg font-bold text-gray-900">₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Use Link component for navigation */}
          <Link
            to="/dashboard" // This would link to your app's dashboard
            className="
              mt-10 flex w-full items-center justify-center space-x-2 rounded-lg bg-blue-600
              px-6 py-3 text-base font-medium text-white shadow-lg
              transition-all duration-300 hover:bg-blue-700 hover:-translate-y-0.5
            "
          >
            <span className="whitespace-nowrap">Go to Your Dashboard</span>
            <FaArrowRight />
          </Link>
          
        </div>
        
        <p className="mt-8 text-sm text-gray-500">
          Need help? <Link to="/#contact" className="font-medium text-blue-600 hover:underline">Contact Support</Link>
        </p>
      </main>
    </div>
  );
}

