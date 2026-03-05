import React from 'react';
import { DollarSign, Users, MessageSquare, BarChart2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import StatCard from '../../components/Dashboard/StatCard';
import OverviewChart from '../../components/Dashboard/charts/OverviewChart';
import ConversationChart from '../../components/Dashboard/charts/ConversationChart';
// 1. Import motion
import { motion } from 'framer-motion';

// 2. Define animation variants for the grid and its items
const gridContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1 // This makes each child animate 0.1s after the previous one
    }
  }
};

const gridItemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

// A simple fade-in for the charts
const fadeInVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, delay: 0.4 } // Delay this so it starts after the cards
  }
};

export default function DashboardPage() {
  const { currentUser } = useAuth(); 

  const recentCustomers = [
    { name: 'Pawan Kushwaha', time: '2m ago', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmhtIDaMD4yH_crArBVbJ0hR8jqK8z8eizIw&s' },
    { name: 'Neha Sharma', time: '1h ago', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQBFy0j_72yEKBKNRbPbCzxfNxq1H9Y57ygg&s' },
    { name: 'Raj Singh', time: '3h ago', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxHa-KJ-5CHqlzCizT29X2IKzUKJJWcL0EqQ&s' },
    { name: 'Mason Rivera', time: '5h ago', avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK5A_n_8GdSA_6HINZjGenZWcOUii51Y6Rgw&s' },
  ];

  return (
    <>
      {/* 3. Wrap the grid in a motion.div */}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        variants={gridContainerVariants}
        initial="hidden"
        animate="show"
      >
        {/* 4. Wrap each StatCard in a motion.div */}
        <motion.div variants={gridItemVariants}>
          <StatCard
            title="Total Revenue"
            value="₹12,450"
            icon={<DollarSign className="w-6 h-6 text-blue-600" />}
            change={12.5}
            bgColor="bg-white"
            textColor="text-gray-900"
            iconBgColor="bg-blue-100"
          />
        </motion.div>
        <motion.div variants={gridItemVariants}>
          <StatCard
            title="New Customers"
            value="182"
            icon={<Users className="w-6 h-6 text-green-600" />}
            change={8.2}
            bgColor="bg-white"
            textColor="text-gray-900"
            iconBgColor="bg-green-100"
          />
        </motion.div>
        <motion.div variants={gridItemVariants}>
          <StatCard
            title="Conversations"
            value="1,204"
            icon={<MessageSquare className="w-6 h-6 text-indigo-600" />}
            change={-2.1}
            bgColor="bg-white"
            textColor="text-gray-900"
            iconBgColor="bg-indigo-100"
          />
        </motion.div>
        <motion.div variants={gridItemVariants}>
          <StatCard
            title="Conversion Rate"
            value="15.3%"
            icon={<BarChart2 className="w-6 h-6 text-amber-600" />}
            change={3.1}
            bgColor="bg-white"
            textColor="text-gray-900"
            iconBgColor="bg-amber-100"
          />
        </motion.div>
      </motion.div>

      {/* 5. Wrap the charts and tables in a simple fade-in */}
      <motion.div
        variants={fadeInVariants}
        initial="hidden"
        animate="show"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          {/* Main Overview Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Business Overview
            </h2>
            <div className="h-80">
              <OverviewChart />
            </div>
          </div>

          {/* Conversation Chart */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Weekly Volume
            </h2>
            <div className="h-80">
              <ConversationChart />
            </div>
          </div>
        </div>

        {/* Recent Activity / Customers */}
        <div className="bg-white p-6 rounded-lg shadow-lg mt-6">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Recent Customers</h2>
          <ul className="divide-y divide-gray-200">
            {recentCustomers.map((customer) => (
              <li key={customer.name} className="py-3 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img className="w-10 h-10 rounded-full" src={customer.avatar} alt={customer.name} />
                  <div>
                    <p className="font-medium text-gray-900">{customer.name}</p>
                    <p className="text-sm text-gray-500">New conversation</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{customer.time}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </>
  );
}