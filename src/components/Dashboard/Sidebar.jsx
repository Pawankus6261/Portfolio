import React, { useEffect, useRef } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Bot,
  MessagesSquare,
  Users,
  BarChart2,
  Brain,
  Plug,
  CreditCard,
  Settings,
  LogOut,
  ArrowLeft,
  Bell
} from 'lucide-react';

// Updated NavItem for the dark theme
const NavItem = ({ to, icon, children, onClick }) => {
  return (
    <NavLink
      to={to}
      end
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center space-x-3 rounded-lg p-3 ${
          isActive
            ? 'bg-blue-600 text-white'
            : 'text-gray-700 hover:bg-gray-100'
        }`
      }
    >
      {icon}
      <span className="font-medium">{children}</span>
    </NavLink>
  );
};

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const trigger = useRef(null);
  const sidebar = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });
  
  // close sidebar on page change
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname, setSidebarOpen]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside
      ref={sidebar}
      className={`
        absolute left-0 top-0 z-50 flex h-screen w-72 flex-col overflow-y-auto 
        bg-white text-gray-900 duration-300 ease-in-out
        lg:static lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <NavLink to="/dashboard">
          <h1 className="text-2xl font-bold text-blue-600">
            ChatFlow<span className="bg-linear-to-br from-blue-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">.AI</span>
          </h1>
        </NavLink>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden text-gray-900 hover:text-blue-300"
        >
          <ArrowLeft size={24} />
        </button>
      </div>

      {/* Nav Menu */}
      <h1 className="px-3 text-sm text-center font-semibold text-gray-900 uppercase">
        Aradhya medical
      </h1>
      <nav className="flex flex-col h-full p-4 space-y-2">
        <div className="grow">
          <p className="px-3 text-xs font-semibold text-gray-900 uppercase">
            Menu
          </p>
          <NavItem to="/dashboard" icon={<LayoutDashboard size={20} />}>
            Dashboard
          </NavItem>
          <NavItem to="/dashboard/chatflows" icon={<Bot size={20} />}>
            Chatflows
          </NavItem>
          <NavItem to="/dashboard/conversations" icon={<MessagesSquare size={20} />}>
            Conversations
          </NavItem>
          <NavItem to="/dashboard/customers" icon={<Users size={20} />}>
            Customers
          </NavItem>
          <NavItem to="/dashboard/notifications" icon={<Bell size={20} />}>
            Notifications
          </NavItem>

          <p className="px-3 pt-4 text-xs font-semibold text-gray-900 uppercase">
            Insights & AI
          </p>
          <NavItem to="/dashboard/analytics" icon={<BarChart2 size={20} />}>
            Analytics
          </NavItem>
          <NavItem to="/dashboard/training" icon={<Brain size={20} />}>
            AI Training
          </NavItem>

          <p className="px-3 pt-4 text-xs font-semibold text-gray-900 uppercase">
            Configuration
          </p>
          <NavItem to="/dashboard/integrations" icon={<Plug size={20} />}>
            Integrations
          </NavItem>
          <NavItem to="/dashboard/billing" icon={<CreditCard size={20} />}>
            Billing
          </NavItem>
          <NavItem to="/dashboard/settings" icon={<Settings size={20} />}>
            Settings
          </NavItem>
        </div>
        <hr className="border-t border-gray-200" />

        <div className="m-5 bg-blue-100 bg-opacity-20 p-4 rounded-lg">
          <p className="font-medium text-gray-900">Upgrade to Business</p>
          <p className="text-sm text-gray-700">
            Get access to advanced features and priority support.
          </p>
          <button className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg">
            Upgrade Now
          </button>
        </div>

        {/* Logout Button */}
        <div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 rounded-lg p-3 bg-red-500 text-white hover:bg-red-600"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}