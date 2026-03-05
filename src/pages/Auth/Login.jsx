import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    try {
      setError('');
      // In a real app, this would be async
      login(email, password);
    } catch (err) {
      setError('Failed to log in. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="text-4xl font-bold text-blue-600">
            ChatFlow<span className="bg-linear-to-br from-blue-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">.AI</span>
          </Link>
          <h2 className="mt-4 text-2xl font-semibold text-gray-800">Welcome Back!</h2>
          <p className="text-gray-600">Sign in to continue to your dashboard.</p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            
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
              <span>Log In</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-8">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}