import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

// Streaming text component with character-by-character animation
export const StreamingText = ({ text, speed = 20, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!text) return;
    
    setDisplayedText('');
    setIsComplete(false);
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
        
        // Auto-scroll to bottom
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      } else {
        clearInterval(interval);
        setIsComplete(true);
        onComplete?.();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, onComplete]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="streaming-text"
      style={{
        paddingLeft: '12px',
        borderLeft: '3px solid #FFD700',
        lineHeight: 1.6,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}
    >
      {displayedText}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          style={{
            display: 'inline-block',
            width: '2px',
            height: '1em',
            background: '#FFD700',
            marginLeft: '2px',
            verticalAlign: 'text-bottom',
          }}
        />
      )}
    </motion.div>
  );
};

// Word-by-word streaming for smoother feel
export const StreamingTextByWord = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (!text) return;
    
    setDisplayedText('');
    setIsComplete(false);
    
    const words = text.split(' ');
    let currentIndex = 0;
    
    const interval = setInterval(() => {
      if (currentIndex < words.length) {
        setDisplayedText(prev => {
          if (!prev) return words[0];
          return prev + ' ' + words[currentIndex];
        });
        currentIndex++;
        
        // Auto-scroll to bottom
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      } else {
        clearInterval(interval);
        setIsComplete(true);
        onComplete?.();
      }
    }, 50); // 50ms per word

    return () => clearInterval(interval);
  }, [text, onComplete]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="streaming-text"
      style={{
        paddingLeft: '12px',
        borderLeft: '3px solid #FFD700',
        lineHeight: 1.6,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}
    >
      {displayedText}
      {!isComplete && (
        <motion.span
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          style={{
            display: 'inline-block',
            width: '8px',
            height: '16px',
            background: '#FFD700',
            marginLeft: '2px',
            borderRadius: '2px',
            verticalAlign: 'text-bottom',
          }}
        />
      )}
    </motion.div>
  );
};

// Combined streaming with markdown support
export const StreamingMarkdown = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  
  useEffect(() => {
    if (!text) return;
    
    setDisplayedText('');
    setIsComplete(false);
    
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < text.length) {
        setDisplayedText(text.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(interval);
        setIsComplete(true);
        onComplete?.();
      }
    }, 15); // Faster for markdown

    return () => clearInterval(interval);
  }, [text, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        paddingLeft: '12px',
        borderLeft: '3px solid #FFD700',
        lineHeight: 1.6,
      }}
    >
      <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
        {displayedText}
        {!isComplete && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            style={{
              display: 'inline-block',
              width: '2px',
              height: '1em',
              background: '#FFD700',
              marginLeft: '2px',
              verticalAlign: 'text-bottom',
            }}
          />
        )}
      </div>
    </motion.div>
  );
};

export default StreamingText;