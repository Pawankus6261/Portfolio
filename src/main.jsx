import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App' 
import { BrowserRouter } from 'react-router-dom'
import { PlanProvider } from './context/PlaneContext'
import { AuthProvider } from './context/AuthContext' 
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from './context/ThemeContext'
// NO "react-helmet-async" import here

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      {/* NO HelmetProvider wrapper here */}
      <ThemeProvider>
        <AuthProvider>
          <PlanProvider>
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 3000,
              }}
            />
            <App />
          </PlanProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)