import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StoragePermissionDialog = ({ show, onAllow, onDeny }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="modal-overlay"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
            className="modal-content"
          >
            {/* Icon */}
            <div style={{
              fontSize: '48px',
              marginBottom: '16px',
            }}>
              💾
            </div>

            {/* Title */}
            <h3 style={{
              color: '#FFD700',
              marginBottom: '12px',
              textAlign: 'center',
            }}>
              Chat History သိမ်းဆည်းရန် ခွင့်ပြုပါ
            </h3>

            {/* Description */}
            <p style={{
              color: '#b0b0b0',
              fontSize: '14px',
              lineHeight: 1.6,
              marginBottom: '24px',
              textAlign: 'center',
            }}>
              သင်၏ စကားဝိုင်းများကို လုံခြုံစွာ သိမ်းဆည်းထားပါမည်။
              ဤ data သည် သင်၏ device တွင်သာ သိမ်းဆည်းပါသည်။
            </p>

            {/* Features */}
            <div style={{
              background: '#1a1a1a',
              borderRadius: '12px',
              padding: '12px',
              marginBottom: '24px',
            }}>
              {[
                { icon: '🔒', text: 'Data encrypted locally' },
                { icon: '📱', text: 'Works offline' },
                { icon: '🗑️', text: 'Clear anytime' },
              ].map((item, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '8px 0',
                    borderBottom: index < 2 ? '1px solid #2d2d2d' : 'none',
                  }}
                >
                  <span style={{ fontSize: '20px' }}>{item.icon}</span>
                  <span style={{ color: '#ffffff', fontSize: '14px' }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <motion.button
                className="btn-secondary"
                onClick={onDeny}
                whileTap={{ scale: 0.97 }}
                style={{ flex: 1 }}
              >
                မခွင့်ပြုပါ
              </motion.button>
              <motion.button
                className="btn-gold"
                onClick={onAllow}
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
  );
};

export default StoragePermissionDialog;