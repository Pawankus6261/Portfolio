import React, { useState } from 'react';
import { 
  User, 
  Users, 
  Bell, 
  Lock, 
  Sun, // For Appearance & ThemeToggle
  Moon, // For ThemeToggle
  Mail, 
  Trash2, 
  Monitor, // For Security
  Smartphone // For Security
} from 'lucide-react';

// We still need this import to make the new "Appearance" tab work
import { useTheme } from '../../context/ThemeContext';

// --- Reusable Toggle Switch Component ---
// (Used for Notifications & Security)
function ToggleSwitch({ label, enabled, setEnabled }) {
  return (
    <label className="flex items-center justify-between cursor-pointer">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <button
        type="button"
        onClick={() => setEnabled(!enabled)}
        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors ${
          enabled ? 'bg-blue-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </label>
  );
}

// --- Your ThemeToggle Component ---
// (Pasted in from src/components/Dashboard/ThemeToggle.jsx)
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const handleToggle = () => {
    toggleTheme();
  };

  return (
    <button
      onClick={handleToggle}
      className="
        text-gray-500 hover:text-gray-700 
        relative h-9 w-9 flex items-center justify-center rounded-full
        hover:bg-gray-100
      "
    >
      <Sun 
        size={22} 
        className={`
          transition-all duration-300 transform
          ${theme === 'light' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'}
        `}
      />
      <Moon 
        size={22} 
        className={`
          absolute transition-all duration-300 transform
          ${theme === 'dark' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'}
        `}
      />
    </button>
  );
}


// --- 1. Account Settings Panel (Expanded) ---
function AccountSettings() {
  return (
    <div className="max-w-2xl">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Account</h2>

      {/* --- Personal Info --- */}
      <form className="space-y-6 p-6 border border-gray-100 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900">Personal Info</h3>
        
        {/* Profile Picture */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Profile Photo</label>
          <div className="mt-2 flex items-center space-x-4">
            <img 
              className="h-16 w-16 rounded-full object-cover"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmhtIDaMD4yH_crArBVbJ0hR8jqK8z8eizIw&s"
              alt="Profile"
            />
            <button
              type="button"
              className="px-3 py-1.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50"
            >
              Change
            </button>
            <button
              type="button"
              className="text-sm font-medium text-red-600 hover:text-red-800"
            >
              Remove
            </button>
          </div>
        </div>
        
        {/* Full Name */}
        <div>
          <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="ownerName"
            defaultValue="Pawan Kushwaha"
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Contact Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Contact Email
          </label>
          <input
            type="email"
            id="email"
            defaultValue="pawan@chatflow.ai"
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        {/* Language & Timezone */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="language" className="block text-sm font-medium text-gray-700">Language</label>
            <select id="language" className="w-full mt-1 p-2 border text-gray-900 border-gray-300 rounded-lg shadow-sm">
              <option className=' bg-white'>English (US)</option>
              <option className=' bg-white'>English (UK)</option>
              <option className=' bg-white'>Hindi</option>
            </select>
          </div>
          <div>
            <label htmlFor="timezone" className="block text-sm font-medium text-gray-700">Timezone</label>
            <select id="timezone" className="w-full mt-1 p-2 border text-gray-900 border-gray-300 rounded-lg shadow-sm">
              <option className='bg-white'> (GMT+5:30) Kolkata</option>
              <option className='bg-white'> (GMT-8:00) Pacific Time</option>
            </select>
          </div>
        </div>
      </form>

      {/* --- Business Info --- */}
      <form className="space-y-6 p-6 border border-gray-100 rounded-lg mt-8">
        <h3 className="text-lg font-medium text-gray-900">Business Info</h3>
        <div>
          <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
            Business Name
          </label>
          <input
            type="text"
            id="businessName"
            defaultValue="ChatFlow AI"
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">
            Business Address
          </label>
          <textarea
            id="address"
            rows="3"
            className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            defaultValue="123 AI Lane, Tech City, 452001"
          ></textarea>
        </div>
      </form>
      
      <div className="pt-6 mt-6 border-t border-gray-200">
        <button
          type="submit"
          className="px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save All Changes
        </button>
      </div>
    </div>
  );
}

// --- 2. Team Settings Panel ---
function TeamSettings() {
  const teamMembers = [
    { name: 'Pawan Kushwaha', email: 'pawan@chatflow.ai', role: 'Admin', avatar: 'PK' },
    { name: 'Jane Doe', email: 'jane@chatflow.ai', role: 'Member', avatar: 'JD' },
    { name: 'Alex Johnson', email: 'alex@chatflow.ai', role: 'Viewer', avatar: 'AJ' },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Team Members</h2>
      {/* Invite Member Section */}
      <div className="mb-8 p-6 border border-gray-100 rounded-lg">
        <label htmlFor="inviteEmail" className="block text-sm font-medium text-gray-700">
          Invite new member
        </label>
        <div className="mt-2 flex space-x-2">
          <input
            type="email"
            id="inviteEmail"
            placeholder="member@example.com"
            className="grow p-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700">
            <Mail className="w-4 h-4" />
            <span>Invite</span>
          </button>
        </div>
      </div>
      
      {/* Member List */}
      <div className="p-6 border border-gray-100 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Current Members</h3>
        <ul className="divide-y divide-gray-200">
          {teamMembers.map((member) => (
            <li key={member.email} className="flex flex-col md:flex-row items-start md:items-center justify-between py-4">
              <div className="flex items-center space-x-4">
                <span className="flex items-center justify-center w-10 h-10 bg-gray-200 text-gray-700 font-semibold rounded-full">
                  {member.avatar}
                </span>
                <div>
                  <p className="font-medium text-gray-900">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4 mt-2 md:mt-0 w-full md:w-auto">
                <select className="w-full md:w-auto p-2 border border-gray-300 rounded-lg text-sm">
                  <option selected={member.role === 'Admin'}>Admin</option>
                  <option selected={member.role === 'Member'}>Member</option>
                  <option selected={member.role === 'Viewer'}>Viewer</option>
                </select>
                <button className="text-gray-400 hover:text-red-600 p-2">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

// --- 3. Notification Settings Panel ---
function NotificationSettings() {
  const [emailNews, setEmailNews] = useState(true);
  const [emailActivity, setEmailActivity] = useState(true);
  const [pushActivity, setPushActivity] = useState(false);

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Notification Preferences</h2>
      <div className="max-w-md space-y-6">
        <fieldset className="space-y-4 p-6 border border-gray-100 rounded-lg">
          <legend className="text-lg font-medium text-gray-900 mb-2">By Email</legend>
          <ToggleSwitch
            label="Product updates & news"
            enabled={emailNews}
            setEnabled={setEmailNews}
          />
          <ToggleSwitch
            label="Activity on my account"
            enabled={emailActivity}
            setEnabled={setEmailActivity}
          />
        </fieldset>
        <fieldset className="space-y-4 p-6 border border-gray-100 rounded-lg">
          <legend className="text-lg font-medium text-gray-900 mb-2">Push Notifications</legend>
          <ToggleSwitch
            label="Activity on my account"
            enabled={pushActivity}
            setEnabled={setPushActivity}
          />
        </fieldset>
        <div className="pt-4">
          <button
            type="button"
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
}

// --- 4. Security Settings Panel (Expanded) ---
function SecuritySettings() {
  const [twoFactor, setTwoFactor] = useState(false);

  const loginHistory = [
    { device: 'Chrome on Windows', location: 'Bhopal, IN', time: 'Current session' },
    { device: 'Mobile App (iOS)', location: 'Indore, IN', time: '2 days ago' },
  ];

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Security</h2>
      <div className="max-w-2xl space-y-8">
        
        {/* Change Password */}
        <form className="space-y-4 p-6 border border-gray-100 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900">Change Password</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">Current Password</label>
            <input type="password" className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input type="password" className="w-full mt-1 p-2 border border-gray-300 rounded-lg shadow-sm" />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"
          >
            Update Password
          </button>
        </form>

        {/* Two-Factor Authentication */}
        <div className="p-6 border border-gray-100 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Two-Factor Authentication (2FA)</h3>
          <ToggleSwitch
            label="Enable 2FA"
            enabled={twoFactor}
            setEnabled={setTwoFactor}
          />
          <p className="text-sm text-gray-500 mt-2">
            Secure your account with an extra layer of protection.
          </p>
        </div>

        {/* Login History */}
        <div className="p-6 border border-gray-100 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Login History</h3>
          <ul className="divide-y divide-gray-200">
            {loginHistory.map((session, index) => (
              <li key={index} className="flex items-center justify-between py-3">
                <div className="flex items-center space-x-3">
                  {session.device.includes('Mobile') ? <Smartphone className="w-5 h-5 text-gray-500" /> : <Monitor className="w-5 h-5 text-gray-500" />}
                  <div>
                    <p className="font-medium text-gray-800">{session.device}</p>
                    <p className="text-sm text-gray-500">{session.location}</p>
                  </div>
                </div>
                <span className={`text-sm ${session.time === 'Current session' ? 'text-green-600 font-medium' : 'text-gray-500'}`}>
                  {session.time}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Danger Zone */}
        <div className="p-6 border border-red-300 rounded-lg bg-red-50">
          <h3 className="text-lg font-medium text-red-800">Danger Zone</h3>
          <p className="text-sm text-red-600 mt-2 mb-4">
            This action is irreversible. Please be certain before proceeding.
          </p>
          <button
            type="button"
            className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700"
          >
            Delete My Account
          </button>
        </div>
      </div>
    </div>
  );
}

// --- 5. Appearance Settings Panel (Using your ThemeToggle) ---
function AppearanceSettings() {
  const { theme } = useTheme(); // Get the current theme to display the label

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Appearance</h2>
      <div className="max-w-md space-y-6">
        <div className="p-6 border border-gray-100 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Theme</h3>
          <p className="text-sm text-gray-600 mb-4">
            Select how ChatFlow AI looks to you. This will be saved for your next visit.
          </p>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span className="font-medium text-gray-800">
              {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
            </span>
            
            {/* --- THIS IS YOUR COMPONENT --- */}
            <ThemeToggle />
            
          </div>
        </div>
      </div>
    </div>
  );
}


// --- Main Settings Page Component ---
// This is the main component you export
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account');

  // Tab configuration
  const tabs = [
    { id: 'account', label: 'Account', icon: User },
    { id: 'team', label: 'Team Members', icon: Users },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'appearance', label: 'Appearance', icon: Sun },
  ];

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
      <p className="text-gray-600">Manage your account, team, and preferences.</p>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mt-6">
        <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
        {/* Render the active component based on the activeTab state */}
        {activeTab === 'account' && <AccountSettings />}
        {activeTab === 'team' && <TeamSettings />}
        {activeTab === 'notifications' && <NotificationSettings />}
        {activeTab === 'security' && <SecuritySettings />}
        {activeTab === 'appearance' && <AppearanceSettings />}
      </div>
    </div>
  );
}