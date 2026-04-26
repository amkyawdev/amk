import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';

import {
  GetStarted,
  LoginPage,
  RegisterPage,
  ResetPage,
  MainPage,
  ChatPage,
  ApiPage,
  DocsPage,
  AboutPage,
} from './pages';

import { StoragePermissionDialog } from './dialogs';

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      setIsLoggedIn(!!user?.isLoggedIn);
    } catch (e) {
      setError(e.message);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div style={{ background: '#000', minHeight: '100vh' }}></div>;
  }

  if (error) {
    return <div style={{ background: '#000', color: '#ff4444', padding: '20px' }}>Error: {error}</div>;
  }
  
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

// Home redirect based on login status
const Home = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const isLoggedIn = user?.isLoggedIn;

  if (isLoggedIn) {
    return <Navigate to="/main" replace />;
  }
  return <Navigate to="/get-started" replace />;
};

function App() {
  const [showStorageDialog, setShowStorageDialog] = useState(false);
  const [hasCheckedStorage, setHasCheckedStorage] = useState(false);

  // Check storage permission on mount
  useEffect(() => {
    const checkStorage = () => {
      const hasPermission = localStorage.getItem('storagePermission');
      const hasMessages = localStorage.getItem('chatMessages');
      
      if (!hasPermission && hasMessages) {
        setShowStorageDialog(true);
      }
      setHasCheckedStorage(true);
    };
    
    // Small delay to ensure localStorage is ready
    const timer = setTimeout(checkStorage, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleStorageAllow = () => {
    localStorage.setItem('storagePermission', 'true');
    setShowStorageDialog(false);
  };

  const handleStorageDeny = () => {
    localStorage.setItem('storagePermission', 'false');
    setShowStorageDialog(false);
  };

  return (
    <BrowserRouter>
      <div style={{
        minHeight: '100vh',
        background: '#000000',
        fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      }}>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#3a3a3a',
              color: '#ffffff',
              border: '1px solid #FFD700',
            },
            success: {
              iconTheme: {
                primary: '#00c853',
                secondary: '#ffffff',
              },
            },
            error: {
              iconTheme: {
                primary: '#ff4444',
                secondary: '#ffffff',
              },
            },
          }}
        />

        <AnimatePresence mode="wait">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/get-started" element={<GetStarted />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/reset" element={<ResetPage />} />

            {/* Protected Routes */}
            <Route
              path="/main"
              element={
                <ProtectedRoute>
                  <MainPage />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="chat" replace />} />
              <Route path="chat" element={<ChatPage />} />
              <Route path="api" element={<ApiPage />} />
              <Route path="docs" element={<DocsPage />} />
              <Route path="about" element={<AboutPage />} />
            </Route>

            {/* Catch all - redirect to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>

        {/* Storage Permission Dialog */}
        {hasCheckedStorage && (
          <StoragePermissionDialog
            show={showStorageDialog}
            onAllow={handleStorageAllow}
            onDeny={handleStorageDeny}
          />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;