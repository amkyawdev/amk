import React from 'react';
import { motion } from 'framer-motion';

// Gold Button with effects
export const GoldButton = ({ children, onClick, disabled, fullWidth, style, ...props }) => {
  return (
    <motion.button
      className="btn-gold"
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.97 }}
      style={{
        width: fullWidth ? '100%' : 'auto',
        opacity: disabled ? 0.6 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...style,
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

// Secondary Button with effects
export const SecondaryButton = ({ children, onClick, disabled, fullWidth, style, ...props }) => {
  return (
    <motion.button
      className="btn-secondary"
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.97 }}
      style={{
        width: fullWidth ? '100%' : 'auto',
        opacity: disabled ? 0.6 : 0.8,
        cursor: disabled ? 'not-allowed' : 'pointer',
        ...style,
      }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

// Icon Button
export const IconButton = ({ icon, onClick, size = 40, color = '#FFD700', style, ...props }) => {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.9, rotate: 10 }}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        border: 'none',
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: color,
        fontSize: `${size * 0.5}px`,
        ...style,
      }}
      {...props}
    >
      {icon}
    </motion.button>
  );
};

// Floating Action Button
export const FloatingActionButton = ({ icon, onClick, style, ...props }) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        border: 'none',
        background: 'linear-gradient(135deg, #FFD700, #DAA520)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 4px 15px rgba(255, 215, 0, 0.4)',
        zIndex: 100,
        ...style,
      }}
      {...props}
    >
      <span style={{ fontSize: '24px', color: '#2a2a2a' }}>{icon}</span>
    </motion.button>
  );
};

// Hamburger Menu Button
export const HamburgerButton = ({ isOpen, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      style={{
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        padding: '4px',
      }}
    >
      <div className="hamburger-icon">
        <motion.span
          animate={isOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </motion.button>
  );
};

// Send Button (special chat send button)
export const SendButton = ({ onClick, disabled, loading }) => {
  return (
    <motion.button
      className="send-button"
      onClick={onClick}
      disabled={disabled || loading}
      whileTap={disabled || loading ? {} : { scale: 0.95 }}
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        border: 'none',
        background: disabled || loading
          ? '#111111'
          : 'linear-gradient(135deg, #FFD700, #DAA520)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        transition: 'background 0.2s, box-shadow 0.2s',
      }}
    >
      {loading ? (
        <i className="bi bi-arrow-repeat spinning" style={{ color: '#b0b0b0' }}></i>
      ) : (
        <i className="bi bi-send" style={{ color: '#2a2a2a' }}></i>
      )}
    </motion.button>
  );
};

// Microphone Button for voice input
export const MicrophoneButton = ({ onClick, recording, disabled }) => {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.9 }}
      animate={recording ? { scale: [1, 1.1, 1] } : {}}
      transition={recording ? { repeat: Infinity, duration: 1 } : {}}
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '20px',
        border: 'none',
        background: recording ? '#ff4444' : '#FFD700',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer',
        boxShadow: recording ? '0 0 15px rgba(255, 68, 68, 0.5)' : 'none',
        transition: 'background 0.2s, box-shadow 0.2s',
      }}
    >
      <i
        className={`bi bi-mic${recording ? '' : ''}`}
        style={{ color: recording ? '#ffffff' : '#2a2a2a' }}
      ></i>
    </motion.button>
  );
};

export default {
  GoldButton,
  SecondaryButton,
  IconButton,
  FloatingActionButton,
  HamburgerButton,
  SendButton,
  MicrophoneButton,
};