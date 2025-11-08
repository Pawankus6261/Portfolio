import React from 'react';
import { Download, Search } from 'lucide-react';

export default function CustomersPage() {
  const customers = [
    { name: 'Pawan Kushwaha', email: 'pawan@example.com', phone: '+91 12345 67890', tags: ['Lead', 'Booking'] },
    { name: 'Neha Sharma', email: 'neha@example.com', phone: '+91 98765 43210', tags: ['Support', 'Resolved'] },
    { name: 'Raj Singh', email: 'raj@example.com', phone: '+91 55555 44444', tags: ['Lead'] },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 ">Customers</h1>
          <p className="text-gray-600">All leads and customers from your chatbots.</p>
        </div>
        <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700">
          <Download size={18} />
          <span>Export CSV</span>
        </button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Customer List</h2>
          <div className="relative">
            <input type="text" placeholder="Search..." className="pl-10 pr-4 py-2 border rounded-full bg-gray-100"/>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b bg-gray-50 ">
                <th className="p-4 text-sm font-semibold text-gray-600 ">Name</th>
                <th className="p-4 text-sm font-semibold text-gray-600 ">Email</th>
                <th className="p-4 text-sm font-semibold text-gray-600 ">Phone</th>
                <th className="p-4 text-sm font-semibold text-gray-600 ">Tags</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.email} className="border-b hover:bg-gray-50 ">
                  <td className="p-4 font-medium text-gray-900">{customer.name}</td>
                  <td className="p-4 text-gray-600">{customer.email}</td>
                  <td className="p-4 text-gray-600">{customer.phone}</td>
                  <td className="p-4">
                    {customer.tags.map(tag => (
                      <span key={tag} className="mr-2 px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-700">
                        {tag}
                      </span>
                    ))}
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