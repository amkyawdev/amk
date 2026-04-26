import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Thanking Animation - Gold sparkles with fade out
export const ThankingAnimation = ({ show, onComplete }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onComplete?.();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 1000,
          }}
        >
          <div style={{ position: 'relative' }}>
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                animate={{
                  opacity: 0,
                  x: Math.cos((i * 30 * Math.PI) / 180) * 50,
                  y: Math.sin((i * 30 * Math.PI) / 180) * 50,
                  scale: 0,
                }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  width: '8px',
                  height: '8px',
                  background: '#FFD700',
                  borderRadius: '50%',
                  boxShadow: '0 0 10px #FFD700',
                }}
              />
            ))}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0] }}
              transition={{ duration: 1.5 }}
              style={{
                fontSize: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              ✨
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Generator Animation - Pulse loading dots (gold)
export const GeneratorAnimation = () => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
      <div className="loading-dots">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <span style={{ marginLeft: '8px', color: '#FFD700' }}>
        ခနလေးစောင့်ပေးပါနော်...
      </span>
    </div>
  );
};

// Send Button Animation
export const SendButtonAnimation = ({ children, onClick, disabled }) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <motion.button
      className="send-button"
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.95 }}
      onTapStart={() => setIsPressed(true)}
      onTap={() => setIsPressed(false)}
      onTapCancel={() => setIsPressed(false)}
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: 'none',
        background: isPressed
          ? 'linear-gradient(135deg, #DAA520, #FFD700)'
          : 'linear-gradient(135deg, #FFD700, #DAA520)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        transition: 'box-shadow 0.2s',
        boxShadow: isPressed ? '0 2px 8px rgba(255, 215, 0, 0.5)' : 'none',
      }}
    >
      {children}
    </motion.button>
  );
};

// Connection Error Animation
export const ConnectionErrorAnimation = ({ show, onRetry }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '20px',
            background: 'rgba(255, 68, 68, 0.1)',
            borderRadius: '12px',
            margin: '12px',
          }}
        >
          <div style={{ fontSize: '24px' }} className="error-icon">
            <i className="bi bi-exclamation-triangle" style={{ fontSize: '16px' }}></i>
          </div>
          <p style={{ color: '#ff4444', marginTop: '8px' }}>
            အင်တာနက်ချိတ်ဆက်မှု ပြတ်တောက်နေပါသည်
          </p>
          <motion.button
            className="btn-gold"
            onClick={onRetry}
            whileTap={{ scale: 0.95 }}
            style={{ marginTop: '12px' }}
          >
            <i className="bi bi-arrow-repeat" style={{ marginRight: '8px' }}></i>
            ပြန်ကြိုးစားမည်
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Success Animation
export const SuccessAnimation = ({ show, message = 'အောင်မြင်ပါပြီ!' }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="work-done-effect"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
            background: 'rgba(0, 200, 83, 0.1)',
            borderRadius: '12px',
            border: '2px solid #00c853',
          }}
        >
          <span style={{ fontSize: '20px', marginRight: '8px' }}>✅</span>
          <span style={{ color: '#00c853', fontWeight: '500' }}>{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Typing Animation
export const TypingAnimation = () => {
  return (
    <div className="loading-dots">
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default {
  ThankingAnimation,
  GeneratorAnimation,
  SendButtonAnimation,
  ConnectionErrorAnimation,
  SuccessAnimation,
  TypingAnimation,
};