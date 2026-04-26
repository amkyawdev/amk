import { useState, useEffect, useCallback } from 'react';

const DAILY_TOKEN_LIMIT = 20;

export const useTokenLimit = () => {
  const [dailyTokens, setDailyTokens] = useState(0);
  const [isLimitReached, setIsLimitReached] = useState(false);

  // Load saved token usage on mount
  useEffect(() => {
    const savedTokens = localStorage.getItem('dailyTokens');
    const lastReset = localStorage.getItem('lastReset');
    
    // Reset daily if it's a new day
    const today = new Date().toDateString();
    if (lastReset !== today) {
      localStorage.setItem('dailyTokens', '0');
      localStorage.setItem('lastReset', today);
      setDailyTokens(0);
    } else {
      setDailyTokens(parseInt(savedTokens) || 0);
    }
  }, []);

  // Check if limit is reached
  useEffect(() => {
    setIsLimitReached(dailyTokens >= DAILY_TOKEN_LIMIT);
  }, [dailyTokens]);

  // Add token usage
  const addTokenUsage = useCallback((tokens = 1) => {
    setDailyTokens((prev) => {
      const newValue = prev + tokens;
      localStorage.setItem('dailyTokens', newValue.toString());
      return newValue;
    });
  }, []);

  // Check if can use tokens
  const canUse = useCallback((tokens = 1) => {
    return (dailyTokens + tokens) <= DAILY_TOKEN_LIMIT;
  }, [dailyTokens]);

  // Reset function (for testing)
  const reset = useCallback(() => {
    setDailyTokens(0);
    localStorage.setItem('dailyTokens', '0');
    localStorage.setItem('lastReset', new Date().toDateString());
  }, []);

  return {
    dailyTokens,
    dailyTokenLimit: DAILY_TOKEN_LIMIT,
    isLimitReached,
    remaining: DAILY_TOKEN_LIMIT - dailyTokens,
    addTokenUsage,
    canUse,
    reset,
  };
};

export default useTokenLimit;