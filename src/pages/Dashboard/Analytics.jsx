import React from 'react';
import { BarChart, PieChart, LineChart, AlertTriangle, Smile, TrendingDown, Users } from 'lucide-react';
import ConversationChart from '../../components/Dashboard/charts/ConversationChart';

export default function AnalyticsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Analytics</h1>
      <p className="text-gray-600">Your AI and business performance metrics.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <div className="bg-white p-6 rounded-lg shadow-lg ">
          <h3 className="text-sm font-medium text-gray-500">Conversation Volume</h3>
          <p className="text-3xl font-bold text-gray-900">1,204</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg ">
          <h3 className="text-sm font-medium text-gray-500">Drop-off Rate</h3>
          <p className="text-3xl font-bold text-gray-900">12%</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg ">
          <h3 className="text-sm font-medium text-gray-500">AI Accuracy</h3>
          <p className="text-3xl font-bold text-gray-900">94%</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg ">
          <h3 className="text-sm font-medium text-gray-500">Satisfaction Score</h3>
          <p className="text-3xl font-bold text-gray-900">4.8/5</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-6 rounded-lg shadow-lg ">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Conversion Graph</h2>
          <div className="h-80"><ConversationChart /></div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg ">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Top User Queries</h2>
          <div className="h-80 flex flex-col items-center justify-center text-gray-400 border-2 border-dashed rounded-lg ">
            <BarChart className="w-16 h-16 mb-2" />
            <p>Query chart coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}