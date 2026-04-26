import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const UserInfoDialog = ({ show, onClose, user }) => {
  if (!user) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="modal-overlay"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Avatar */}
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FFD700, #DAA520)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              <span style={{ fontSize: '36px' }}>👤</span>
            </div>

            {/* Title */}
            <h3 style={{
              color: '#FFD700',
              marginBottom: '24px',
              textAlign: 'center',
            }}>
              အသုံးပြုသူ အချက်အလက်
            </h3>

            {/* User Info */}
            <div style={{
              background: '#1a1a1a',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '24px',
            }}>
              <div style={{ marginBottom: '16px' }}>
                <p style={{ color: '#b0b0b0', fontSize: '12px', marginBottom: '4px' }}>
                  အမည်
                </p>
                <p style={{ color: '#ffffff', fontSize: '14px', fontWeight: '500' }}>
                  {user.name || 'အသုံးပြုသူ'}
                </p>
              </div>

              <div>
                <p style={{ color: '#b0b0b0', fontSize: '12px', marginBottom: '4px' }}>
                  အီးမေးလ်
                </p>
                <p style={{ color: '#ffffff', fontSize: '14px' }}>
                  {user.email || 'user@example.com'}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <motion.button
                className="btn-secondary"
                onClick={onClose}
                whileTap={{ scale: 0.97 }}
                style={{ flex: 1 }}
              >
                ပိတ်ရန်
              </motion.button>
              <motion.button
                className="btn-gold"
                onClick={onClose}
                whileTap={{ scale: 0.97 }}
                style={{ flex: 1 }}
              >
                အိုကေ
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default UserInfoDialog;