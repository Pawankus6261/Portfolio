import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// This is a mock auth provider. It uses localStorage to "remember" the user.
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Used to check session
  const navigate = useNavigate();

  // On app load, check localStorage for a saved user
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('chatflow-user');
      if (savedUser) {
        setCurrentUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Failed to parse saved user", error);
      localStorage.removeItem('chatflow-user');
    }
    setLoading(false); // Done checking
  }, []);

  // Mock Login function
  const login = (email, password) => {
    // In a real app, you'd fetch this from your API
    const user = { email: email, name: "Pawan Kushwaha" }; 
    localStorage.setItem('chatflow-user', JSON.stringify(user));
    setCurrentUser(user);
    navigate('/dashboard');
  };

  // Mock SignUp function
  const signup = (email, password) => {
    // In a real app, you'd POST this to your API
    const user = { email: email, name: "New User" };
    localStorage.setItem('chatflow-user', JSON.stringify(user));
    setCurrentUser(user);
    navigate('/dashboard');
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('chatflow-user');
    setCurrentUser(null);
    navigate('/login');
  };

  const value = {
    currentUser,
    loading,
    login,
    signup,
    logout,
  };

  // We don't render anything until we've checked for a user
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};