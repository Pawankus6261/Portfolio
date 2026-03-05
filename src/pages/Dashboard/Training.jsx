import React from 'react';
import { Upload, Plus } from 'lucide-react';

export default function TrainingPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">AI Training</h1>
      <p className="text-gray-600">Train your chatbot by adding data sources.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Add FAQs</h2>
          <p className="text-gray-600 mb-4 dark:text-gray-500">Add question and answer pairs.</p>
          <form className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-900">Question</label>
              <input type="text" placeholder="e.g., What are your opening hours?" className="w-full mt-1 p-2 border rounded-lg"/>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-900">Answer</label>
              <textarea placeholder="We are open from 9 AM to 5 PM." className="w-full mt-1 p-2 border rounded-lg" rows="3"></textarea>
            </div>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700">
              <Plus size={18} />
              <span>Add FAQ</span>
            </button>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Upload Documents</h2>
          <p className="text-gray-600 mb-4">Upload PDFs, .txt, or .docx files.</p>
          <div className="h-64 flex flex-col items-center justify-center text-gray-500 border-2 border-dashed border-gray-300 rounded-lg">
            <Upload className="w-16 h-16 mb-2" />
            <p>Drag & drop files here</p>
            <p className="text-xs">or click to browse</p>
            <input type="file" className="hidden" />
          </div>
          <p className="text-sm text-gray-500 mt-4">Training Progress: 80%</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '80%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}