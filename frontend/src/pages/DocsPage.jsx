import React from 'react';
import { motion } from 'framer-motion';

const DocsPage = () => {
  const docs = [
    {
      icon: 'bi bi-rocket-takeoff',
      title: 'စတင်အသုံးပြုနည်း',
      content: 'A-I ကို အသုံးပြုရန် ပထမဦးစွာ အကောင့်ဖန်တီးပါ။ ထို့နောက် Chat page သို့ သွားပါ။ သင်မေးလိုသော မေးခွန်းကို ရိုက်ထည့်ပါ။ Send button ကို နှိပ်ပါ။ AI ၏ အဖြေကို streaming ဖြင့် ရရှိပါမည်။',
    },
    {
      icon: 'bi bi-chat-dots',
      title: 'Chat အသုံးပြုနည်း',
      content: 'Chat page တွင် စကားပြောဆိုနိုင်ပါပြီ။ Text input တွင် မေးခွန်းရေးပါ သို့မဟုတ် microphone button ကို နှိပ်ပါ။ AI အဖြေများကို text-to-speech ဖြင့် ရရှိပါသည်။',
    },
    {
      icon: 'bi bi-phone',
      title: 'Mobile App',
      content: 'A-I ကို PWA အနေဖြင့် mobile device များတွင် install လုပ်နိုင်ပါသည်။ Browser ၏ menu မှ "Add to Home Screen" ကို နှိပ်ပါ။ App ကဲ့သို့ အသုံးပြုနိုင်ပါပြီ။',
    },
    {
      icon: 'bi bi-mic',
      title: 'Voice Input',
      content: 'Microphone button ကို နှိပ်ပါ။ သင်၏ voice ဖြင့် input ထည့်သွင်းနိုင်ပါသည်။ ထို့နောက် AI အဖြေကို ရရှိပါမည်။',
    },
    {
      icon: 'bi bi-book',
      title: 'Chat History',
      content: 'သင်၏ chat history များကို local storage တွင် သိမ်းဆည်းထားပါသည်။ Browser cache ကို clear လုပ်ပါက history များ ပျောက်ဆုံးနိုင်ပါသည်။',
    },
    {
      icon: 'bi bi-exclamation-triangle',
      title: 'Limits & Restrictions',
      content: 'ယနေ့အတွက် token limit (20) နှင့် speech limit (20 seconds) ရှိပါသည်။ ဤ limits များသည် daily အခြေဖြင့် reset ပြုလုပ်ပါသည်။',
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
          <i className="bi bi-book" style={{ fontSize: '16px' }}></i> အသုံးပြုနည်း
        </h1>
        <p style={{ color: '#b0b0b0', fontSize: '14px' }}>
          A-I ကို အသုံးပြုနည်း လမ်းညွှန်
        </p>
      </motion.div>

      {/* Docs List */}
      {docs.map((doc, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
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
            gap: '12px',
            marginBottom: '12px',
          }}>
            <i className={doc.icon} style={{ fontSize: '24px' }}></i>
            <h3 style={{
              color: '#FFD700',
              fontSize: '16px',
              margin: 0,
            }}>
              {doc.title}
            </h3>
          </div>
          <p style={{
            color: '#b0b0b0',
            fontSize: '14px',
            lineHeight: 1.6,
            margin: 0,
          }}>
            {doc.content}
          </p>
        </motion.div>
      ))}

      {/* Quick Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        style={{
          background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(218, 165, 32, 0.1))',
          borderRadius: '12px',
          padding: '16px',
          marginTop: '24px',
          border: '1px solid rgba(255, 215, 0, 0.3)',
        }}
      >
        <h3 style={{
          color: '#FFD700',
          fontSize: '16px',
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          💡 Quick Tips
        </h3>
        <ul style={{
          color: '#b0b0b0',
          fontSize: '14px',
          paddingLeft: '20px',
          margin: 0,
        }}>
          <li style={{ marginBottom: '8px' }}>
            Markdown format ဖြင့် code snippets များထည့်နိုင်ပါသည်
          </li>
          <li style={{ marginBottom: '8px' }}>
            Send button ထက် Enter key သုံးပါက ပိုမြန်ပါသည်
          </li>
          <li style={{ marginBottom: '8px' }}>
            Clear chat button သည် history များကို ဖျက်ပါသည်
          </li>
          <li>
            Settings မှ theme ပြောင်းနိုင်ပါသည်
          </li>
        </ul>
      </motion.div>
    </div>
  );
};

export default DocsPage;