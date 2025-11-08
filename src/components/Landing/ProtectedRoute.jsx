import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


export default function ProtectedRoute() {
  const { currentUser, loading } = useAuth();


  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="spinner"></div>
      </div>
    );
  }


  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}