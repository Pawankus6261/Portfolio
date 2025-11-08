import React from 'react';
import { 
  Globe, 
  FileSpreadsheet, // <-- New icon for Excel
  Database,
  Facebook,
  InstagramIcon,

} from 'lucide-react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';

const IntegrationCard = ({ title, desc, icon, connected = false }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between">
    <div>
      <div className="flex items-center space-x-4 mb-3">
        <div className="p-3 bg-blue-100 rounded-lg">
          {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      </div>
      <p className="text-sm text-gray-500">{desc}</p>
    </div>
    <button className={`mt-5 w-full py-2 rounded-lg font-medium ${
      connected
        ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        : 'bg-blue-500 text-white hover:bg-blue-600'
    }`}>
      {connected ? 'Manage' : 'Connect'}
    </button>
  </div>
);

export default function IntegrationsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Integrations</h1>
      <p className="text-gray-600">Connect ChatFlow AI to your other platforms.</p>

      {/* --- Messaging Platforms --- */}
      <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Messaging</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <IntegrationCard 
          title="WhatsApp" 
          desc="Connect to WhatsApp Business API." 
          icon={<FaWhatsapp size={25} className="text-green-500"/>} 
          connected={true} // Example: Already connected
        />
        <IntegrationCard 
          title="Facebook" 
          desc="Connect to Facebook Messenger." 
          icon={<Facebook className="text-blue-600"/>} 
        />
        <IntegrationCard 
          title="Instagram" 
          desc="Connect to Instagram DMs." 
          icon={<FaInstagram size={25} className="text-purple-600"/>} 
        />
      </div>

      {/* --- Data Sources --- */}
      <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Data Sources</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* --- HERE IS THE GOOGLE DRIVE CARD --- */}
        <IntegrationCard 
          title="Google Drive" 
          desc="Sync documents from Google Drive." 
          icon={
            <img 
              src="https://img.icons8.com/color/48/000000/google-drive.png" 
              alt="Google Drive"
              className="w-6 h-6"
            />
          }
        />
        
        <IntegrationCard 
          title="Excel / Sheets" 
          desc="Connect to an Excel or Google Sheet." 
          icon={<FileSpreadsheet className='text-green-600' />} 
        />
      </div>

      {/* --- Other Tools --- */}
      <h2 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Other Tools</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <IntegrationCard 
          title="Website Widget" 
          desc="Embed a chat widget on your site." 
          icon={<Globe className="text-blue-600"/>} 
        />
       
      </div>
    </div>
  );
}