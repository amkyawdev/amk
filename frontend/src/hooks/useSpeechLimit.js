import { useState, useEffect, useCallback } from 'react';

const DAILY_SPEECH_LIMIT = 20;
const ESTIMATED_CHARS_PER_SECOND = 2.5;

export const useSpeechLimit = () => {
  const [dailySpeechSec, setDailySpeechSec] = useState(0);
  const [isLimitReached, setIsLimitReached] = useState(false);

  // Load saved speech usage on mount
  useEffect(() => {
    const savedSpeech = localStorage.getItem('dailySpeech');
    const lastReset = localStorage.getItem('lastReset');
    
    // Reset daily if it's a new day
    const today = new Date().toDateString();
    if (lastReset !== today) {
      localStorage.setItem('dailySpeech', '0');
      localStorage.setItem('lastReset', today);
      setDailySpeechSec(0);
    } else {
      setDailySpeechSec(parseInt(savedSpeech) || 0);
    }
  }, []);

  // Check if limit is reached
  useEffect(() => {
    setIsLimitReached(dailySpeechSec >= DAILY_SPEECH_LIMIT);
  }, [dailySpeechSec]);

  // Estimate speech time for text
  const estimateSpeechTime = useCallback((text) => {
    return Math.ceil(text.length / ESTIMATED_CHARS_PER_SECOND);
  }, []);

  // Add speech usage
  const addSpeechUsage = useCallback((seconds) => {
    setDailySpeechSec((prev) => {
      const newValue = prev + seconds;
      localStorage.setItem('dailySpeech', newValue.toString());
      return newValue;
    });
  }, []);

  // Check if can speak (estimated text)
  const canSpeak = useCallback((text) => {
    const estimated = estimateSpeechTime(text);
    return (dailySpeechSec + estimated) <= DAILY_SPEECH_LIMIT;
  }, [dailySpeechSec, estimateSpeechTime]);

  // Reset function (for testing)
  const reset = useCallback(() => {
    setDailySpeechSec(0);
    localStorage.setItem('dailySpeech', '0');
    localStorage.setItem('lastReset', new Date().toDateString());
  }, []);

  return {
    dailySpeechSec,
    dailySpeechLimit: DAILY_SPEECH_LIMIT,
    isLimitReached,
    remaining: DAILY_SPEECH_LIMIT - dailySpeechSec,
    estimateSpeechTime,
    addSpeechUsage,
    canSpeak,
    reset,
  };
};

export default useSpeechLimit;