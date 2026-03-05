import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function SignUpPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !name) {
      setError('Please fill in all fields.');
      return;
    }
    try {
      setError('');
      signup(email, password, name);
    } catch (err) {
      setError('Failed to create an account.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-bold text-blue-600">
            ChatFlow<span className="bg-linear-to-br from-blue-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">.AI</span>
          </Link>
          <h2 className="mt-4 text-2xl font-semibold text-gray-800">Create Your Account</h2>
          <p className="text-gray-600">Get started with your free demo today.</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Pawan Kushwaha"
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center items-center gap-2 bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-blue-700 transition-all"
            >
              <span>Create Account</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-8">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-blue-600 hover:underline">
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}