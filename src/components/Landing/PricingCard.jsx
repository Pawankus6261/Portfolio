import React, { useState, useRef } from 'react';
import { FaCheck } from 'react-icons/fa';
// 1. Import Link and useNavigate from React Router
import { Link, useNavigate } from 'react-router-dom';
// 2. Import the new usePlan hook we are about to create
import { usePlan } from '../../context/PlaneContext';

export default function PricingCard({ plan, isAnnual }) {
  const { name, price, desc, features, popular } = plan;

  // 3. Get the state setter from the context and the navigate function
  const { setSelectedPlan } = usePlan();
  const navigate = useNavigate();

  const cardRef = useRef(null);
  const [style, setStyle] = useState({ opacity: 0 });

  const isCustom = price.monthly === 'Custom';
  const displayPrice = isAnnual ? price.annual : price.monthly;
  const priceSuffix = isAnnual ? '/year' : '/month';
  const buttonText = isCustom ? 'Contact Sales' : 'Get Started';

  // Spotlight effect (no change)
  const handleMouseMove = (e) => {
    if (popular || isCustom || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const gradient = `radial-gradient(350px circle at ${x}px ${y}px, rgba(59, 130, 246, 0.3), transparent 80%)`;
    setStyle({ background: gradient, opacity: 1 });
  };

  const handleMouseLeave = () => {
    if (popular || isCustom) return;
    setStyle({ opacity: 0 });
  };

  // 4. This function runs when a non-custom plan is clicked
  const handleSelectPlan = (e) => {
    // We prevent the link from navigating immediately
    e.preventDefault();
    
    // Set the selected plan in our global state
    setSelectedPlan({ ...plan, isAnnual }); // Save the plan and billing cycle
    
    // Now, programmatically navigate to the payment page
    navigate('/payment');
  };

  // 5. Extracted button classes to a variable to keep JSX clean
  const buttonClasses = `
    mt-8 w-full rounded-lg px-6 py-3 text-center text-lg font-medium transition-all duration-300
    ${popular
      ? 'bg-blue-600 text-white shadow-lg hover:bg-blue-700'
      : 'bg-gray-100 text-gray-800'
    }
    ${!popular && !isCustom && 'group-hover:bg-gray-200'}
    ${isCustom && 'bg-gray-100 text-gray-800 hover:bg-gray-200'}
  `;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`
        group relative rounded-xl p-px transition-all duration-300
        ${popular
          ? 'bg-linear-to-r from-blue-500 via-purple-500 to-blue-500 bg-size-[200%_100%] animate-[sweep_3s_ease-in-out_infinite] shadow-xl hover:-translate-y-2'
          : 'bg-gray-200'
        }
        ${!popular && !isCustom && 'hover:shadow-lg'}
      `}
    >
      <div
        style={style}
        className="absolute inset-0 z-0 rounded-xl transition-opacity duration-300"
      />

      <div className="relative z-10 flex h-full flex-col rounded-[11px] bg-white p-8">
        
        {popular && (
          <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-4 py-1 text-sm font-semibold text-white">
            Most Popular
          </span>
        )}

        <h3 className="text-left text-2xl font-semibold">{name}</h3>
        
        <div className="mt-4 flex items-baseline text-left">
          <span className="text-4xl font-bold">{displayPrice}</span>
          {!isCustom && (
            <span className="ml-1 text-gray-500">{priceSuffix}</span>
          )}
        </div>
        
        <p className="mt-2 text-left text-gray-600">{desc}</p>
        
        <ul className="mt-6 grow space-y-3 text-left">
          {features.map((feature) => (
            <li key={feature} className="flex items-center">
              <FaCheck className="mr-3 h-4 w-4 shrink-0 text-green-500" />
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>

        {/* --- 6. DYNAMIC BUTTON --- */}
        {/* It's a normal <a> tag for "Contact Sales" */}
        {isCustom ? (
          <a
            href="#contact"
            className={buttonClasses}
          >
            {buttonText}
          </a>
        ) : (
          // It's a React Router <Link> for "Get Started"
          <Link
            to="/payment" // The destination route
            onClick={handleSelectPlan} // The click handler to set state
            className={buttonClasses}
          >
            {buttonText}
          </Link>
        )}
      </div>
    </div>
  );
}
