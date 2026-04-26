import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { GoldButton } from '../components/ButtonEffects';

const ResetPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('အီးမေးလ် ထည့်သွင်းပါ');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('အီးမေးလ် ပုံစံမှန်ကန်မှု မရှိပါ');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // Simulate password reset - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSuccess(true);
    } catch (err) {
      setError('စကားဝှက်ပြန်လည်သတ်မှတ်မှု မအောင်မြင်ပါ');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
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
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', damping: 15 }}
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #00c853, #00e676)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '24px',
          }}
        >
          <span style={{ fontSize: '40px' }}>✓</span>
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ color: '#00c853', marginBottom: '12px', textAlign: 'center' }}
        >
          အီးမေးလ်ပို့ပြီးပါပြီ!
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ color: '#b0b0b0', textAlign: 'center', marginBottom: '32px' }}
        >
          {email} သို့ စကားဝှက်ပြန်လည်သတ်မှတ်ရန် link ပို့ပါပြီ
        </motion.p>
        
        <Link to="/login">
          <GoldButton>
            <i className="bi bi-arrow-left" style={{ marginRight: '8px' }}></i>
            အကောင့်ဝင်ရန်
          </GoldButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="page" style={{
      background: 'linear-gradient(180deg, #000000 0%, #111111 100%)',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: '24px',
    }}>
      {/* Back Button */}
      <motion.button
        onClick={() => navigate('/')}
        whileTap={{ scale: 0.95 }}
        style={{
          position: 'absolute',
          top: '24px',
          left: '24px',
          background: 'transparent',
          border: 'none',
          color: '#FFD700',
          fontSize: '24px',
          cursor: 'pointer',
        }}
      >
        ←
      </motion.button>

      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{ textAlign: 'center', marginBottom: '32px' }}
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
          <i className="bi bi-key-fill" style={{ fontSize: '28px' }}></i>
        </div>
        <h1 style={{ fontSize: '24px', color: '#FFD700', marginBottom: '8px' }}>
          စကားဝှက်မေ့သွားပါသလား?
        </h1>
        <p style={{ color: '#b0b0b0', fontSize: '14px' }}>
          သင်၏အီးမေးလ်ကို ထည့်သွင်းပါ၊ ပြန်လည်သတ်မှတ်ရန် link ပို့ပါမည်
        </p>
      </motion.div>

      {/* Form */}
      <motion.form
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        onSubmit={handleSubmit}
        style={{ width: '100%', maxWidth: '360px', margin: '0 auto' }}
      >
        {/* Email */}
        <div style={{ marginBottom: '16px' }}>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            placeholder="သင်၏အီးမေးလ်"
            style={{
              width: '100%',
              padding: '12px 16px',
              background: '#000000',
              border: error ? '2px solid #ff4444' : '2px solid #111111',
              borderRadius: '12px',
              color: '#ffffff',
              fontSize: '16px',
            }}
          />
          {error && (
            <p style={{ color: '#ff4444', fontSize: '12px', marginTop: '4px' }}>
              {error}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <GoldButton
          fullWidth
          type="submit"
          disabled={loading}
          style={{ padding: '14px' }}
        >
          {loading ? (
            <>
              <i className="bi bi-arrow-repeat spinning" style={{ marginRight: '8px' }}></i>
              ပို့နေသည်...
            </>
          ) : (
            <>
              <i className="bi bi-send" style={{ marginRight: '8px' }}></i>
              ပြန်လည်သတ်မှတ်ရန် Link ပို့ပါ
            </>
          )}
        </GoldButton>
      </motion.form>

      {/* Back to Login */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        style={{
          textAlign: 'center',
          marginTop: '24px',
          color: '#b0b0b0',
          fontSize: '14px',
        }}
      >
        <Link to="/login" style={{ color: '#FFD700', textDecoration: 'none' }}>
          ← အကောင့်ဝင်ရန်
        </Link>
      </motion.p>
    </div>
  );
};

export default ResetPage;