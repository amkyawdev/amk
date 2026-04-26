import React from 'react';
import { motion } from 'framer-motion';

const AboutPage = () => {
  return (
    <div style={{
      padding: '16px',
      maxWidth: '428px',
      margin: '0 auto',
    }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: '24px', textAlign: 'center' }}
      >
        <div style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #FFD700, #DAA520)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 16px',
          boxShadow: '0 0 30px rgba(255, 215, 0, 0.3)',
        }}>
          <i className="bi bi-robot" style={{ fontSize: '48px' }}></i>
        </div>
        <h1 style={{
          fontSize: '28px',
          color: '#FFD700',
          marginBottom: '8px',
        }}>
          A-I
        </h1>
        <p style={{ color: '#b0b0b0', fontSize: '14px' }}>
          Version 1.0.0
        </p>
      </motion.div>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          background: '#242424',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '16px',
        }}
      >
        <h3 style={{
          color: '#FFD700',
          fontSize: '16px',
          marginBottom: '12px',
        }}>
          အကြောင်းအရာ
        </h3>
        <p style={{
          color: '#b0b0b0',
          fontSize: '14px',
          lineHeight: 1.6,
        }}>
          A-I သည် မြန်မာစာသားကို အထူးပြုလုပ်ထားသော AI assistant application ဖြစ်ပါသည်။ 
          Groq API ကို အသုံးပြုပြီး lightning-fast inference ဖြင့် 
          အဖြေများကို streaming ဖြင့် ရရှိနိုင်ပါသည်။
        </p>
      </motion.div>

      {/* Tech Stack */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{
          background: '#242424',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '16px',
        }}
      >
        <h3 style={{
          color: '#FFD700',
          fontSize: '16px',
          marginBottom: '12px',
        }}>
          <i className="bi bi-rocket-takeoff" style={{ fontSize: '20px' }}></i> Tech Stack
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {['React', 'Vite', 'Framer Motion', 'Groq API', 'Hugging Face', 'Vercel'].map((tech) => (
            <span
              key={tech}
              style={{
                padding: '6px 12px',
                background: '#111111',
                borderRadius: '16px',
                fontSize: '12px',
                color: '#FFD700',
              }}
            >
              {tech}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{
          background: '#242424',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '16px',
        }}
      >
        <h3 style={{
          color: '#FFD700',
          fontSize: '16px',
          marginBottom: '12px',
        }}>
          ✨ Features
        </h3>
        <ul style={{
          color: '#b0b0b0',
          fontSize: '14px',
          paddingLeft: '20px',
          margin: 0,
        }}>
          <li style={{ marginBottom: '8px' }}>Streaming text response</li>
          <li style={{ marginBottom: '8px' }}>Voice input support</li>
          <li style={{ marginBottom: '8px' }}>Text-to-speech</li>
          <li style={{ marginBottom: '8px' }}>Markdown rendering</li>
          <li style={{ marginBottom: '8px' }}>PWA support</li>
          <li>Daily usage limits</li>
        </ul>
      </motion.div>

      {/* Contact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        style={{
          background: '#242424',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '16px',
        }}
      >
        <h3 style={{
          color: '#FFD700',
          fontSize: '16px',
          marginBottom: '12px',
        }}>
          📞 ဆက်သွယ်ရန်
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <a
            href="https://github.com/amkyawdev"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              background: '#111111',
              borderRadius: '8px',
              textDecoration: 'none',
              color: '#ffffff',
              transition: 'background 0.2s',
            }}
          >
            <i className="bi bi-octagon-fill" style={{ fontSize: '20px' }}></i>
            <span>GitHub: @amkyawdev</span>
          </a>
          <a
            href="mailto:hello@amkyawdev.ai"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px',
              background: '#111111',
              borderRadius: '8px',
              textDecoration: 'none',
              color: '#ffffff',
              transition: 'background 0.2s',
            }}
          >
            <i className="bi bi-envelope-fill" style={{ fontSize: '20px' }}></i>
            <span>hello@amkyawdev.ai</span>
          </a>
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        style={{
          textAlign: 'center',
          paddingTop: '24px',
          borderTop: '1px solid #111111',
        }}
      >
        <p style={{ color: '#b0b0b0', fontSize: '12px' }}>
          © 2024 A-I. All rights reserved.
        </p>
        <p style={{ color: '#FFD700', fontSize: '11px', marginTop: '8px' }}>
          Made with ❤️ by AmkyawDev
        </p>
      </motion.div>
    </div>
  );
};

export default AboutPage;