import React from 'react';
import { Plus, MoreVertical, Search } from 'lucide-react';

export default function ChatflowsPage() {
  const chatflows = [
    { name: 'Main Welcome Bot', status: 'Active', edited: '2 days ago' },
    { name: 'Support Bot', status: 'Active', edited: '5 hours ago' },
    { name: 'Booking Bot', status: 'Inactive', edited: '1 week ago' },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Chatflows</h1>
          <p className="text-gray-600">Manage your form-based chatbots.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700">
          <Plus size={18} />
          <span>Create Chatflow</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Your Chatbots</h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="pl-10 pr-4 py-2 border rounded-full bg-gray-100"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="p-4 text-sm font-semibold text-gray-600">Name</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Status</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Last Edited</th>
                <th className="p-4 text-sm font-semibold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {chatflows.map((flow) => (
                <tr key={flow.name} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium text-gray-900">{flow.name}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      flow.status === 'Active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {flow.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-600">{flow.edited}</td>
                  <td className="p-4">
                    <button className="text-gray-500 hover:text-gray-900">
                      <MoreVertical size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}