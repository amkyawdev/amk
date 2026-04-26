import React from 'react';
import { motion } from 'framer-motion';

const ApiPage = () => {
  const apiEndpoints = [
    {
      method: 'POST',
      endpoint: '/api/chat',
      description: 'AI နှင့် စကားပြောရန်',
      params: ['message', 'systemPrompt'],
      response: 'Streaming text response',
    },
    {
      method: 'POST',
      endpoint: '/api/auth/login',
      description: 'အကောင့်ဝင်ရန်',
      params: ['email', 'password'],
      response: '{ token, user }',
    },
    {
      method: 'POST',
      endpoint: '/api/auth/register',
      description: 'အကောင့်ဖန်တီးရန်',
      params: ['name', 'email', 'password'],
      response: '{ token, user }',
    },
    {
      method: 'GET',
      endpoint: '/api/user/profile',
      description: 'အသုံးပြုသူ ပရိုဖိုင်',
      params: [],
      response: '{ id, name, email, limits }',
    },
    {
      method: 'GET',
      endpoint: '/api/user/limits',
      description: 'ယနေ့အသုံးပြုမှု အခြေအနေ',
      params: [],
      response: '{ dailyTokens, dailySpeechSec }',
    },
  ];

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
        style={{ marginBottom: '24px' }}
      >
        <h1 style={{
          fontSize: '24px',
          color: '#FFD700',
          marginBottom: '8px',
        }}>
          🔌 API Reference
        </h1>
        <p style={{ color: '#b0b0b0', fontSize: '14px' }}>
          REST API အသုံးပြုနည်း
        </p>
      </motion.div>

      {/* Base URL */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          background: '#242424',
          borderRadius: '12px',
          padding: '16px',
          marginBottom: '16px',
        }}
      >
        <p style={{ color: '#b0b0b0', fontSize: '12px', marginBottom: '4px' }}>
          Base URL
        </p>
        <code style={{
          color: '#FFD700',
          fontSize: '14px',
          fontFamily: 'monospace',
        }}>
          https://huggingface.co/spaces/amkyawdev/amkyaw-ai-backend
        </code>
      </motion.div>

      {/* Endpoints */}
      {apiEndpoints.map((endpoint, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 * (index + 1) }}
          style={{
            background: '#242424',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '12px',
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '8px',
          }}>
            <span style={{
              padding: '4px 8px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: '600',
              background: endpoint.method === 'GET' ? '#00c853' : '#FFD700',
              color: endpoint.method === 'GET' ? '#000000' : '#000000',
            }}>
              {endpoint.method}
            </span>
            <code style={{
              color: '#ffffff',
              fontSize: '14px',
              fontFamily: 'monospace',
            }}>
              {endpoint.endpoint}
            </code>
          </div>
          
          <p style={{ color: '#b0b0b0', fontSize: '13px', marginBottom: '8px' }}>
            {endpoint.description}
          </p>
          
          {endpoint.params.length > 0 && (
            <div style={{ marginBottom: '8px' }}>
              <p style={{ color: '#FFD700', fontSize: '11px', marginBottom: '4px' }}>
                Parameters:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {endpoint.params.map((param, i) => (
                  <span
                    key={i}
                    style={{
                      padding: '2px 8px',
                      background: '#111111',
                      borderRadius: '4px',
                      fontSize: '12px',
                      color: '#ffffff',
                      fontFamily: 'monospace',
                    }}
                  >
                    {param}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <p style={{ color: '#00c853', fontSize: '12px' }}>
            Response: <code style={{ color: '#b0b0b0' }}>{endpoint.response}</code>
          </p>
        </motion.div>
      ))}

      {/* Code Example */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        style={{
          background: '#000000',
          borderRadius: '12px',
          padding: '16px',
          marginTop: '24px',
        }}
      >
        <h3 style={{
          color: '#FFD700',
          fontSize: '16px',
          marginBottom: '12px',
        }}>
          ဥပမာ Code
        </h3>
        <pre style={{
          background: '#242424',
          padding: '12px',
          borderRadius: '8px',
          overflow: 'auto',
          fontSize: '12px',
          color: '#e0e0e0',
          fontFamily: 'monospace',
        }}>
{`const response = await fetch(
  '/api/chat',
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message: 'မင်္ဂလာပါ',
      systemPrompt: 'You are a helpful AI'
    })
  }
);

const reader = response.body.getReader();
let answer = '';

while (true) {
  const {done, value} = await reader.read();
  if (done) break;
  answer += new TextDecoder().decode(value);
}`}
        </pre>
      </motion.div>
    </div>
  );
};

export default ApiPage;