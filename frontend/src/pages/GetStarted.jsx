import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { GoldButton } from '../components/ButtonEffects';

const GetStarted = () => {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  React.useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="page" style={{
      background: 'linear-gradient(180deg, #000000 0%, #111111 100%)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '24px',
    }}>
      {/* Logo/Brand */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #FFD700, #DAA520)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '32px',
          boxShadow: '0 0 40px rgba(255, 215, 0, 0.3)',
        }}
      >
        <i className="bi bi-robot" style={{ fontSize: '48px', color: '#000000' }}></i>
      </motion.div>

      {/* App Name */}
      <motion.h1
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        style={{
          fontSize: '32px',
          color: '#FFD700',
          marginBottom: '8px',
          textAlign: 'center',
        }}
      >
        A-I
      </motion.h1>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        style={{
          fontSize: '14px',
          color: '#b0b0b0',
          marginBottom: '48px',
          textAlign: 'center',
        }}
      >
        မြန်မာ AI အကူအရာရာ
      </motion.p>

      {/* Feature Highlights */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          marginBottom: '48px',
          width: '100%',
          maxWidth: '300px',
        }}
      >
        {[
          { icon: 'bi bi-chat-dots', text: 'အရာရာမေးမြန်းနိုင်' },
          { icon: 'bi bi-book', text: 'ဗဟုသုတများရှာဖွေ' },
          { icon: 'bi bi-stars', text: 'အထူးအကူမှုများ' },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8 + index * 0.1 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              background: '#242424',
              borderRadius: '12px',
            }}
          >
            <i className={item.icon} style={{ fontSize: '24px' }}></i>
            <span style={{ color: '#ffffff', fontSize: '14px' }}>{item.text}</span>
          </motion.div>
        ))}
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          width: '100%',
          maxWidth: '300px',
        }}
      >
        <GoldButton
          fullWidth
          onClick={() => navigate('/register')}
        >
          <i className="bi bi-rocket-takeoff" style={{ marginRight: '8px' }}></i>
          စတင်ရန်
        </GoldButton>

        <motion.button
          className="btn-secondary"
          onClick={() => navigate('/login')}
          whileTap={{ scale: 0.97 }}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '24px',
            border: '2px solid #FFD700',
            background: 'transparent',
            color: '#FFD700',
            cursor: 'pointer',
          }}
        >
          <i className="bi bi-key-fill" style={{ marginRight: '8px' }}></i>
          အကောင့်ဝင်ရန်
        </motion.button>
      </motion.div>

      {/* Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: 'absolute',
          bottom: '24px',
          fontSize: '12px',
          color: '#b0b0b0',
        }}
      >
        © 2024 A-I. All rights reserved.
      </motion.p>
    </div>
  );
};

export default GetStarted;