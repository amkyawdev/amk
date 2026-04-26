// Local Storage utility for chat history and user data

const KEYS = {
  USER: 'user',
  CHAT_MESSAGES: 'chatMessages',
  DAILY_TOKENS: 'dailyTokens',
  DAILY_SPEECH: 'dailySpeech',
  LAST_RESET: 'lastReset',
  STORAGE_PERMISSION: 'storagePermission',
  THEME: 'theme',
};

class LocalStorage {
  // Check if localStorage is available
  isAvailable() {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }

  // Get item with JSON parsing
  get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      if (item === null) return defaultValue;
      return JSON.parse(item);
    } catch (e) {
      console.error(`Error getting ${key} from localStorage:`, e);
      return defaultValue;
    }
  }

  // Set item with JSON stringifying
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error(`Error setting ${key} to localStorage:`, e);
      return false;
    }
  }

  // Remove item
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error(`Error removing ${key} from localStorage:`, e);
      return false;
    }
  }

  // Clear all app-related data
  clear() {
    Object.values(KEYS).forEach((key) => {
      this.remove(key);
    });
  }

  // Check if daily limits should be reset
  checkDailyReset() {
    const lastReset = this.get(KEYS.LAST_RESET);
    const today = new Date().toDateString();
    
    if (lastReset !== today) {
      this.set(KEYS.LAST_RESET, today);
      this.set(KEYS.DAILY_TOKENS, 0);
      this.set(KEYS.DAILY_SPEECH, 0);
      return true;
    }
    return false;
  }

  // Chat Messages
  saveMessages(messages) {
    return this.set(KEYS.CHAT_MESSAGES, messages);
  }

  getMessages() {
    return this.get(KEYS.CHAT_MESSAGES, []);
  }

  clearMessages() {
    return this.remove(KEYS.CHAT_MESSAGES);
  }

  // User
  saveUser(user) {
    return this.set(KEYS.USER, user);
  }

  getUser() {
    return this.get(KEYS.USER, null);
  }

  clearUser() {
    return this.remove(KEYS.USER);
  }

  // Theme
  setTheme(theme) {
    return this.set(KEYS.THEME, theme);
  }

  getTheme() {
    return this.get(KEYS.THEME, 'dark');
  }

  // Storage Permission
  setStoragePermission(allowed) {
    return this.set(KEYS.STORAGE_PERMISSION, allowed);
  }

  hasStoragePermission() {
    return this.get(KEYS.STORAGE_PERMISSION, false);
  }
}

export const localStorageUtils = new LocalStorage();
export { KEYS };
export default localStorageUtils;