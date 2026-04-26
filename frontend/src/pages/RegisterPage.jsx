import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { GoldButton } from '../components/ButtonEffects';

const RegisterPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = 'အမည် ထည့်သွင်းပါ';
    }
    if (!formData.email) {
      newErrors.email = 'အီးမေးလ် ထည့်သွင်းပါ';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'အီးမေးလ် ပုံစံမှန်ကန်မှု မရှိပါ';
    }
    if (!formData.password) {
      newErrors.password = 'စကားဝှက် ထည့်သွင်းပါ';
    } else if (formData.password.length < 6) {
      newErrors.password = 'စကားဝှက်သည် ၆ လုံးထက် ပိုရပါမည်';
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'စကားဝှက်များ တူညီမှု မရှိပါ';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      // Simulate registration - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      // Store user session
      localStorage.setItem('user', JSON.stringify({
        name: formData.name,
        email: formData.email,
        isLoggedIn: true,
      }));
      
      navigate('/main');
    } catch (error) {
      setErrors({ general: 'အကောင့်ဖန်တီးမှု မအောင်မြင်ပါ' });
    } finally {
      setLoading(false);
    }
  };

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
        <h1 style={{ fontSize: '28px', color: '#FFD700', marginBottom: '8px' }}>
          အကောင့်ဖန်တီးရန်
        </h1>
        <p style={{ color: '#b0b0b0', fontSize: '14px' }}>
          AI အကူကို ယနေ့စတင်အသုံးပြုပါ
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
        {/* Name */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ color: '#b0b0b0', fontSize: '12px', marginBottom: '4px', display: 'block' }}>
            အမည်
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="သင်၏အမည်"
            style={{
              width: '100%',
              padding: '12px 16px',
              background: '#000000',
              border: errors.name ? '2px solid #ff4444' : '2px solid #111111',
              borderRadius: '12px',
              color: '#ffffff',
              fontSize: '16px',
            }}
          />
          {errors.name && (
            <p style={{ color: '#ff4444', fontSize: '12px', marginTop: '4px' }}>
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ color: '#b0b0b0', fontSize: '12px', marginBottom: '4px', display: 'block' }}>
            အီးမေးလ်
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@email.com"
            style={{
              width: '100%',
              padding: '12px 16px',
              background: '#000000',
              border: errors.email ? '2px solid #ff4444' : '2px solid #111111',
              borderRadius: '12px',
              color: '#ffffff',
              fontSize: '16px',
            }}
          />
          {errors.email && (
            <p style={{ color: '#ff4444', fontSize: '12px', marginTop: '4px' }}>
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ color: '#b0b0b0', fontSize: '12px', marginBottom: '4px', display: 'block' }}>
            စကားဝှက်
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="စကားဝှက် (၆ လုံးထက်ပိုရ)"
              style={{
                width: '100%',
                padding: '12px 48px 12px 16px',
                background: '#000000',
                border: errors.password ? '2px solid #ff4444' : '2px solid #111111',
                borderRadius: '12px',
                color: '#ffffff',
                fontSize: '16px',
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                color: '#b0b0b0',
                cursor: 'pointer',
              }}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
          {errors.password && (
            <p style={{ color: '#ff4444', fontSize: '12px', marginTop: '4px' }}>
              {errors.password}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div style={{ marginBottom: '16px' }}>
          <label style={{ color: '#b0b0b0', fontSize: '12px', marginBottom: '4px', display: 'block' }}>
            စကားဝှက်ပြန်ထည့်ပါ
          </label>
          <div style={{ position: 'relative' }}>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="စကားဝှက်ပြန်ထည့်ပါ"
              style={{
                width: '100%',
                padding: '12px 48px 12px 16px',
                background: '#000000',
                border: errors.confirmPassword ? '2px solid #ff4444' : '2px solid #111111',
                borderRadius: '12px',
                color: '#ffffff',
                fontSize: '16px',
              }}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'transparent',
                border: 'none',
                color: '#b0b0b0',
                cursor: 'pointer',
              }}
            >
              {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
          {errors.confirmPassword && (
            <p style={{ color: '#ff4444', fontSize: '12px', marginTop: '4px' }}>
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {/* General Error */}
        {errors.general && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              padding: '12px',
              background: 'rgba(255, 68, 68, 0.1)',
              borderRadius: '8px',
              marginBottom: '16px',
              textAlign: 'center',
            }}
          >
            <p style={{ color: '#ff4444', fontSize: '14px' }}>{errors.general}</p>
          </motion.div>
        )}

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
              ဖန်တီးနေသည်...
            </>
          ) : (
            <>
              <i className="bi bi-person-plus" style={{ marginRight: '8px' }}></i>
              အကောင့်ဖန်တီးရန်
            </>
          )}
        </GoldButton>

        {/* Terms */}
        <p style={{
          textAlign: 'center',
          marginTop: '16px',
          fontSize: '11px',
          color: '#b0b0b0',
        }}>
          မှတ်ပုံတင်ခြင်းဖြင့် ကျွန်ုပ်တို့၏{' '}
          <span style={{ color: '#FFD700' }}>စည်းမျဉ်းသတ်မှတ်များ</span> ကို
          သဘောတူပါသည်
        </p>
      </motion.form>

      {/* Login Link */}
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
        အကောင့်ရှိပါပြီ?{' '}
        <Link to="/login" style={{ color: '#FFD700', textDecoration: 'none', fontWeight: '500' }}>
          အကောင့်ဝင်ရန်
        </Link>
      </motion.p>
    </div>
  );
};

export default RegisterPage;