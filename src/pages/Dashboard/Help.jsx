import React, { useState } from 'react';
// import { Link } from 'react-router-dom'; // No longer needed
import { useAuth } from '../../context/AuthContext'; // To greet the user
import { 
  Search, 
  ChevronDown, 
  LifeBuoy,
  AlertCircle, // For Common Problems
  Paperclip, // For file uploads
  Send // For send button
} from 'lucide-react';

// --- Reusable FaqItem (Defined locally) ---
function FaqItem({ question, answer, isOpen, onClick }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm theme-dark:border-gray-700 theme-dark:bg-gray-800">
      <button
        onClick={onClick}
        className="flex w-full items-center justify-between p-6 text-left focus:outline-none"
      >
        <span className="text-lg font-medium text-gray-900 theme-dark:text-white">{question}</span>
        <ChevronDown
          className={`
            h-5 w-5 shrink-0 text-blue-600
            transition-transform duration-300 ease-in-out
            ${isOpen ? 'rotate-180' : 'rotate-0'}
          `}
        />
      </button>
      <div
        className={`
          overflow-hidden transition-all duration-300 ease-in-out
          ${isOpen ? 'max-h-96' : 'max-h-0'}
        `}
      >
        <p className="p-6 pt-0 text-gray-700 theme-dark:text-gray-300"
           dangerouslySetInnerHTML={{ __html: answer }} // Allows for <strong> tags
        />
      </div>
    </div>
  );
}

// --- Expanded & Categorized FAQ Data ---
const faqData = {
  general: [
    {
      q: 'What is ChatFlow.AI?',
      a: 'ChatFlow.AI is a platform that lets you build, manage, and deploy AI-powered chatbots for WhatsApp, websites, and other platforms without writing any code.',
    },
    {
      q: 'Is my data secure?',
      a: 'Yes. We use industry-standard encryption for all data. Your customer data and conversations are 100% secure and private.',
    },
  ],
  chatflows: [
    {
      q: 'What is a "Chatflow"?',
      a: 'A "Chatflow" is the set of rules, actions, and messages you create in our visual builder. It\'s the "brain" of your chatbot that defines how it talks to users.',
    },
    {
      q: 'What happens if the AI doesn\'t know the answer?',
      a: 'You can set a "fallback" action in your Chatflow. This can be a message asking the user to rephrase, or you can use the "Live Handoff" action to notify a human team member.',
    },
    {
      q: 'How do I train the AI?',
      a: 'Go to the <strong>AI Training</strong> page. You can upload PDFs, .txt files, scrape data from a website, or add question-and-answer pairs directly for the AI to learn from.',
    },
  ],
   integrations: [
    {
      q: 'How do I connect my WhatsApp number?',
      a: 'Go to the <strong>Integrations</strong> page and click "Connect" on the WhatsApp card. You will be guided through the Meta Business API setup process.',
    },
    {
      q: 'My bot isn\'t replying on WhatsApp.',
      a: 'First, check your <strong>Integrations</strong> page to ensure WhatsApp is "Connected". Second, make sure you have an "Active" chatflow assigned to that number. If both are correct, check your Meta Business account for any errors.'
    },
  ],
  billing: [
    {
      q: 'How do I upgrade or change my plan?',
      a: 'You can manage your plan at any time by going to <strong>Settings > Billing</strong>. All changes are pro-rated.',
    },
    {
      q: 'Where can I find my invoices?',
      a: 'All your past invoices are available for download in the "Billing History" section of the <strong>Settings > Billing</strong> page.',
    },
  ],
};

const faqCategories = [
  { id: 'general', name: 'General' },
  { id: 'chatflows', name: 'Chatflows' },
  { id: 'integrations', name: 'Integrations' },
  { id: 'billing', name: 'Billing' },
];

// --- Main Page Component ---
export default function HelpCenterPage() {
  const { currentUser } = useAuth(); // Get the logged-in user
  const [activeFaqTab, setActiveFaqTab] = useState('general');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // State for the new "Describe Problem" form
  const [problemTopic, setProblemTopic] = useState('');
  const [problemDescription, setProblemDescription] = useState('');

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleSubmitProblem = (e) => {
    e.preventDefault();
    // Here you would send the data to your backend
    console.log('Submitting problem:', { problemTopic, problemDescription });
    alert('Support ticket submitted! We will get back to you soon.');
    setProblemTopic('');
    setProblemDescription('');
  };
  
  // Helper function to click FAQs from "Common Problems"
  const handleProblemClick = (tab, index) => {
    setActiveFaqTab(tab);
    setOpenFaqIndex(index);
  };

  return (
    // This root div fits inside your DashboardLayout
    <div>
      {/* Top Banner/Header (NO LOGO) */}
      <div className="bg-white border-b border-gray-200 rounded-lg shadow-sm py-8 px-4 md:px-8 theme-dark:bg-gray-800 theme-dark:border-gray-700">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 theme-dark:text-white">
            Hi, {currentUser?.name || 'there'}. How can we help?
          </h1>
          <div className="relative mt-6 w-full">
            <input
              type="text"
              placeholder="Search questions, keywords, or topics"
              className="w-full rounded-md py-3 pl-12 pr-4 text-base border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 theme-dark:bg-gray-700 theme-dark:border-gray-600 theme-dark:text-white"
            />
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Main Content Area (2-column layout) */}
      <div className="container mx-auto py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- 1. Left (Main) Column --- */}
        <main className="lg:col-span-2 space-y-12">
          
          {/* --- "Frequently Asked Questions" Section --- */}
          <section>
            <h2 className="mb-6 text-2xl font-semibold text-gray-900 theme-dark:text-white">
              Frequently Asked Questions
            </h2>
            {/* Tab Buttons */}
            <div className="mb-6 border-b border-gray-200 theme-dark:border-gray-700">
              <nav className="-mb-px flex space-x-6 overflow-x-auto" aria-label="Tabs">
                {faqCategories.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveFaqTab(tab.id);
                      setOpenFaqIndex(null); // Reset open item on tab change
                    }}
                    className={`whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm ${
                      activeFaqTab === tab.id
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
            
            {/* Tab Content */}
            <div className="space-y-4">
              {faqData[activeFaqTab].map((faq, index) => (
                <FaqItem
                  key={index}
                  question={faq.q}
                  answer={faq.a}
                  isOpen={openFaqIndex === index}
                  onClick={() => toggleFaq(index)}
                />
              ))}
            </div>
          </section>

        </main>

        {/* --- 2. Right Sidebar --- */}
        <aside className="lg:col-span-1 shrink-0 space-y-6 lg:sticky lg:top-24">
          
          {/* --- "PRE-PROBLEMS" SECTION --- */}
          <div className="bg-white p-6 rounded-lg shadow-sm theme-dark:bg-gray-800">
            <h3 className="text-lg font-semibold text-gray-900 theme-dark:text-white mb-3">
              Common Problems
            </h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => handleProblemClick('integrations', 1)} 
                  className="flex items-start space-x-2 text-sm text-left text-blue-600 hover:underline theme-dark:text-blue-400"
                >
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>My bot isn't replying on WhatsApp</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleProblemClick('billing', 1)} 
                  className="flex items-start space-x-2 text-sm text-left text-blue-600 hover:underline theme-dark:text-blue-400"
                >
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>I can't find my invoice</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleProblemClick('general', 0)} // This needs a "reset password" FAQ
                  className="flex items-start space-x-2 text-sm text-left text-blue-600 hover:underline theme-dark:text-blue-400"
                >
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>How do I reset my password?</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleProblemClick('chatflows', 2)} 
                  className="flex items-start space-x-2 text-sm text-left text-blue-600 hover:underline theme-dark:text-blue-400"
                >
                  <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>My AI is giving wrong answers</span>
                </button>
              </li>
            </ul>
          </div>
          
          {/* --- "DESCRIBE YOUR PROBLEM" FORM --- */}
          <div id="contact" className="bg-white p-6 rounded-lg shadow-sm theme-dark:bg-gray-800">
            <div className="flex items-center space-x-3 mb-4">
              <LifeBuoy className="h-6 w-6 text-blue-600" />
              <h3 className="text-lg font-semibold text-gray-900 theme-dark:text-white">
                Still need help?
              </h3>
            </div>
            <p className="text-sm text-gray-600 mt-1 theme-dark:text-gray-400 mb-4">
              Describe your problem and we'll get back to you.
            </p>
            
            <form onSubmit={handleSubmitProblem} className="space-y-4">
              <div>
                <label htmlFor="problemTopic" className="block text-sm font-medium text-gray-700 theme-dark:text-gray-300">
                  What is your problem about?
                </label>
                <select
                  id="problemTopic"
                  value={problemTopic}
                  onChange={(e) => setProblemTopic(e.target.value)}
                  className="mt-1 block w-full px-4 h-10 text-gray-800 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 theme-dark:bg-gray-700 theme-dark:border-gray-600"
                >
                  <option value="">Select a topic</option>
                  <option value="billing">Billing or Plans</option>
                  <option value="chatflow">Chatflow Issue</option>
                  <option value="integration">Integration (WhatsApp, etc)</option>
                  <option value="ai-training">AI Training</option>
                  <option value="account">Account & Login</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="problemDescription" className="block text-sm font-medium text-gray-700 theme-dark:text-gray-300">
                  Describe the problem
                </label>
                <textarea
                  id="problemDescription"
                  rows="4"
                  value={problemDescription}
                  onChange={(e) => setProblemDescription(e.target.value)}
                  placeholder="Please provide as much detail as possible..."
                  className="mt-1 p-4 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 theme-dark:bg-gray-700 theme-dark:border-gray-600"
                ></textarea>
              </div>
              
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-blue-600 theme-dark:text-gray-400 theme-dark:hover:text-blue-400"
                >
                  <Paperclip className="w-4 h-4" />
                  <span>Add images</span>
                </button>
                <button
                  type="submit"
                  className="flex items-center justify-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-md transition-all hover:bg-blue-700"
                >
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </button>
              </div>
            </form>
          </div>
        </aside>

      </div>
    </div>
  );
}