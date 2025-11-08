import React from 'react';
import { CheckCircle, CreditCard, Download } from 'lucide-react';

export default function BillingPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Subscription & Billing</h1>
      <p className="text-gray-600">Manage your plan and payment methods.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Current Plan</h2>
          <div className="mb-6">
            <p className="text-4xl font-bold text-gray-900">₹999<span className="text-lg font-medium text-gray-500">/month</span></p>
            <p className="font-medium text-blue-600 text-lg">Business Plan</p>
          </div>
          <ul className="space-y-3 mb-6">
            <li className="flex items-center text-gray-600"><CheckCircle className="w-5 h-5 text-green-500 mr-2" />Unlimited chats</li>
            <li className="flex items-center text-gray-600"><CheckCircle className="w-5 h-5 text-green-500 mr-2" />5 WhatsApp Numbers</li>
            <li className="flex items-center text-gray-600"><CheckCircle className="w-5 h-5 text-green-500 mr-2" />CRM & Calendar Integrations</li>
          </ul>
          <button className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700">
            Upgrade Plan
          </button>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Payment Method</h2>
          <div className="flex items-center p-4 border rounded-lg">
            <CreditCard className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <p className="font-semibold text-gray-800">Visa ending in 1234</p>
              <p className="text-sm text-gray-500">Expires 12/2026</p>
            </div>
          </div>
          <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
            Update Payment Method
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-900">Billing History</h2>
        <table className="w-full text-left">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className="p-4 text-sm font-semibold text-gray-600">Date</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Amount</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Status</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Invoice</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b hover:bg-gray-50">
              <td className="p-4 text-gray-600">Oct 1, 2025</td>
              <td className="p-4 font-medium text-gray-900">₹999.00</td>
              <td className="p-4"><span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">Paid</span></td>
              <td className="p-4"><button className="text-blue-600"><Download size={20} /></button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}