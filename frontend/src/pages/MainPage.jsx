import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { HamburgerButton } from '../components/ButtonEffects';

const MainPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showStorageDialog, setShowStorageDialog] = useState(false);

  const menuItems = [
    { path: '/main', icon: 'bi bi-house', label: 'ပင်မ', exact: true },
    { path: '/main/chat', icon: 'bi bi-chat-dots', label: 'စကားပြောရန်' },
    { path: '/main/api', icon: 'bi bi-code-slash', label: 'API' },
    { path: '/main/docs', icon: 'bi bi-book', label: 'အသုံးပြုနည်း' },
    { path: '/main/about', icon: 'bi bi-info-circle', label: 'အကြောင်း' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const getCurrentTitle = () => {
    const item = menuItems.find(item => 
      item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path)
    );
    return item?.label || 'A-I';
  };

  return (
    <div className="page" style={{
      background: '#2a2a2a',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Navbar */}
      <nav style={{
        background: '#000000',
        padding: '12px 16px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        borderBottom: '1px solid #111111',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <HamburgerButton isOpen={menuOpen} onClick={() => setMenuOpen(!menuOpen)} />
          <span style={{ color: '#FFD700', fontSize: '20px', fontWeight: '700' }}>
            {getCurrentTitle()}
          </span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <motion.button
            onClick={() => setShowUserInfo(true)}
            whileTap={{ scale: 0.9 }}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FFD700, #DAA520)',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <i className="bi bi-person-fill" style={{ fontSize: '16px', color: '#2a2a2a' }}></i>
          </motion.button>
        </div>
      </nav>

      {/* Sidebar Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0, 0, 0, 0.5)',
                zIndex: 200,
              }}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25 }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '280px',
                height: '100vh',
                background: '#000000',
                zIndex: 300,
                padding: '24px 16px',
                borderRight: '1px solid #111111',
              }}
            >
              {/* Logo */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '32px',
                padding: '0 8px',
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #FFD700, #DAA520)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <i className="bi bi-rocket-takeoff" style={{ fontSize: '20px' }}></i>
                </div>
                <span style={{ color: '#FFD700', fontSize: '20px', fontWeight: '700' }}>
                  A-I
                </span>
              </div>

              {/* Menu Items */}
              {menuItems.map((item) => (
                <motion.button
                  key={item.path}
                  onClick={() => {
                    navigate(item.path);
                    setMenuOpen(false);
                  }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px 16px',
                    marginBottom: '8px',
                    background: location.pathname === item.path ? '#FFD700' : 'transparent',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                >
                  <i className={item.icon} style={{ fontSize: '20px' }}></i>
                  <span style={{
                    color: location.pathname === item.path ? '#2a2a2a' : '#ffffff',
                    fontSize: '16px',
                    fontWeight: location.pathname === item.path ? '600' : '400',
                  }}>
                    {item.label}
                  </span>
                </motion.button>
              ))}

              {/* Logout Button */}
              <motion.button
                onClick={handleLogout}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 16px',
                  marginTop: 'auto',
                  background: 'transparent',
                  border: '2px solid #ff4444',
                  borderRadius: '12px',
                  cursor: 'pointer',
                }}
              >
                <span style={{ fontSize: '20px' }}>🚪</span>
                <span style={{ color: '#ff4444', fontSize: '16px' }}>ထွက်ရန်</span>
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Outlet />
      </main>

      {/* User Info Dialog */}
      <AnimatePresence>
        {showUserInfo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setShowUserInfo(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FFD700, #DAA520)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 16px',
              }}>
                <i className="bi bi-person-fill" style={{ fontSize: '28px' }}></i>
              </div>
              <h3 style={{ color: '#FFD700', marginBottom: '24px' }}>
                အသုံးပြုသူ အချက်အလက်
              </h3>
              
              <div style={{
                background: '#2a2a2a',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '16px',
              }}>
                <p style={{ color: '#b0b0b0', fontSize: '12px', marginBottom: '4px' }}>
                  အီးမေးလ်
                </p>
                <p style={{ color: '#ffffff', fontSize: '14px' }}>
                  {JSON.parse(localStorage.getItem('user') || '{}').email || 'user@example.com'}
                </p>
              </div>

              <div style={{
                display: 'flex',
                gap: '12px',
              }}>
                <motion.button
                  className="btn-secondary"
                  onClick={() => setShowUserInfo(false)}
                  whileTap={{ scale: 0.97 }}
                  style={{ flex: 1 }}
                >
                  ပိတ်ရန်
                </motion.button>
                <motion.button
                  className="btn-gold"
                  onClick={handleLogout}
                  whileTap={{ scale: 0.97 }}
                  style={{ flex: 1 }}
                >
                  ထွက်ရန်
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Storage Permission Dialog */}
      <AnimatePresence>
        {showStorageDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={() => setShowStorageDialog(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div style={{
                fontSize: '48px',
                marginBottom: '16px',
              }}>
                <i className="bi bi-save-fill" style={{ fontSize: '18px' }}></i>
              </div>
              <h3 style={{ color: '#FFD700', marginBottom: '12px' }}>
                Chat History သိမ်းဆည်းရန် ခွင့်ပြုပါ
              </h3>
              <p style={{ color: '#b0b0b0', fontSize: '14px', marginBottom: '24px' }}>
                သင်၏ စကားဝိုင်းများကို လုံခြုံစွာ သိမ်းဆည်းထားပါမည်
              </p>
              
              <div style={{ display: 'flex', gap: '12px' }}>
                <motion.button
                  className="btn-secondary"
                  onClick={() => setShowStorageDialog(false)}
                  whileTap={{ scale: 0.97 }}
                  style={{ flex: 1 }}
                >
                  မခွင့်ပြုပါ
                </motion.button>
                <motion.button
                  className="btn-gold"
                  onClick={() => {
                    localStorage.setItem('storagePermission', 'true');
                    setShowStorageDialog(false);
                  }}
                  whileTap={{ scale: 0.97 }}
                  style={{ flex: 1 }}
                >
                  ခွင့်ပြုပါ
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MainPage;