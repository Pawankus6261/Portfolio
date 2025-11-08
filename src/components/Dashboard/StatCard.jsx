import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({ title, value, icon, change, bgColor, textColor, iconBgColor }) {
  const isPositive = change > 0;
  const changeText = change > 0 ? `+${change}%` : `${change}%`;

  return (
    <div className={`p-5 rounded-lg shadow-md ${bgColor}`}>
      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-full ${iconBgColor}`}>
          {icon}
        </div>
        <div className="text-right">
          <p className={`text-sm font-medium ${textColor === 'text-white' ? 'text-blue-100' : 'text-gray-600'}`}>{title}</p>
          <p className={`text-3xl font-bold ${textColor}`}>{value}</p>
        </div>
      </div>
      <div className="mt-3 flex items-center space-x-1 text-sm">
        {isPositive ? <TrendingUp size={16} className="text-green-600" /> : <TrendingDown size={16} className="text-red-600" />}
        <span className={`${isPositive ? 'text-green-600' : 'text-red-600'} ${textColor === 'text-white' ? (isPositive ? 'text-green-300' : 'text-red-300') : ''}`}>
          {changeText}
        </span>
        <span className={`${textColor === 'text-white' ? 'text-blue-100' : 'text-gray-500'} ml-1`}>from last month</span>
      </div>
    </div>
  );
}