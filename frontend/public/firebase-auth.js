// A-I Firebase Authentication Utility

class FirebaseAuth {
  constructor() {
    this.auth = window.auth;
    this.db = window.db;
    this.currentUser = null;
    this.initialized = false;
  }

  // Initialize and wait for Firebase
  async init() {
    return new Promise((resolve, reject) => {
      if (this.initialized) {
        resolve(this.currentUser);
        return;
      }
      
      this.auth.onAuthStateChanged((user) => {
        this.currentUser = user;
        this.initialized = true;
        resolve(user);
      }, reject);
    });
  }

  // Sign up with email and password
  async signUp(email, password, name) {
    try {
      const userCredential = await this.auth.createUserWithEmailAndPassword(email, password);
      
      // Update user profile with name
      await userCredential.user.updateProfile({
        displayName: name
      });
      
      // Create user document in Firestore
      await this.createUserDocument(userCredential.user, { name, email });
      
      return {
        success: true,
        user: this.formatUser(userCredential.user)
      };
    } catch (error) {
      return {
        success: false,
        error: this.getErrorMessage(error.code)
      };
    }
  }

  // Sign in with email and password
  async signIn(email, password) {
    try {
      const userCredential = await this.auth.signInWithEmailAndPassword(email, password);
      
      // Update last login
      await this.updateLastLogin(userCredential.user.uid);
      
      return {
        success: true,
        user: this.formatUser(userCredential.user)
      };
    } catch (error) {
      return {
        success: false,
        error: this.getErrorMessage(error.code)
      };
    }
  }

  // Sign out
  async signOut() {
    try {
      await this.auth.signOut();
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  }

  // Send password reset email
  async resetPassword(email) {
    try {
      await this.auth.sendPasswordResetEmail(email);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: this.getErrorMessage(error.code)
      };
    }
  }

  // Create user document in Firestore
  async createUserDocument(user, additionalData = {}) {
    const userRef = this.db.collection('users').doc(user.uid);
    
    await userRef.set({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || additionalData.name || 'User',
      createdAt: this.timestamp(),
      lastLogin: this.timestamp(),
      ...additionalData
    }, { merge: true });
  }

  // Update last login timestamp
  async updateLastLogin(uid) {
    const userRef = this.db.collection('users').doc(uid);
    await userRef.update({
      lastLogin: this.timestamp()
    });
  }

  // Get user data from Firestore
  async getUserData(uid) {
    try {
      const userDoc = await this.db.collection('users').doc(uid).get();
      if (userDoc.exists) {
        return { success: true, data: userDoc.data() };
      }
      return { success: false, error: 'User data not found' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Update user profile
  async updateProfile(data) {
    if (!this.currentUser) {
      return { success: false, error: 'Not authenticated' };
    }
    
    try {
      const updates = {};
      if (data.displayName) {
        await this.currentUser.updateProfile({ displayName: data.displayName });
        updates.displayName = data.displayName;
      }
      
      // Update Firestore
      await this.db.collection('users').doc(this.currentUser.uid).update(updates);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Get chat history from Firestore
  async getChatHistory(limit = 50) {
    if (!this.currentUser) {
      return { success: false, error: 'Not authenticated' };
    }
    
    try {
      const messagesRef = this.db.collection('users')
        .doc(this.currentUser.uid)
        .collection('messages')
        .orderBy('timestamp', 'desc')
        .limit(limit);
      
      const snapshot = await messagesRef.get();
      const messages = [];
      
      snapshot.forEach((doc) => {
        messages.push({ id: doc.id, ...doc.data() });
      });
      
      return { success: true, data: messages };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Save chat message to Firestore
  async saveMessage(message) {
    if (!this.currentUser) {
      return { success: false, error: 'Not authenticated' };
    }
    
    try {
      await this.db.collection('users')
        .doc(this.currentUser.uid)
        .collection('messages')
        .add({
          text: message.text,
          isBot: message.isBot,
          timestamp: this.timestamp(),
          tokensUsed: message.tokensUsed || 0
        });
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Clear chat history
  async clearChatHistory() {
    if (!this.currentUser) {
      return { success: false, error: 'Not authenticated' };
    }
    
    try {
      const messagesRef = this.db.collection('users')
        .doc(this.currentUser.uid)
        .collection('messages');
      
      const snapshot = await messagesRef.get();
      const batch = this.db.batch();
      
      snapshot.forEach((doc) => {
        batch.delete(doc.ref);
      });
      
      await batch.commit();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  // Check if email exists
  async emailExists(email) {
    try {
      const signInMethods = await this.auth.fetchSignInMethodsForEmail(email);
      return signInMethods.length > 0;
    } catch (error) {
      return false;
    }
  }

  // Get timestamp for Firestore
  timestamp() {
    return this.db.Timestamp.now();
  }

  // Format user object
  formatUser(user) {
    return {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
  }

  // Get error message in Burmese
  getErrorMessage(code) {
    const messages = {
      'auth/email-already-in-use': 'ဤအီးမေးလ်သည် အသုံးပြုပြီးဖြစ်ပါသည်',
      'auth/invalid-email': 'အီးမေးလ် ပုံစံမှန်ကန်မှု မရှိပါ',
      'auth/operation-not-allowed': 'ဤလုပ်ဆောင်ချက်သည် ကိုင်တွယ်မရပါ',
      'auth/weak-password': 'စကားဝှက်သည် အားနည်းပါသည် (အနည်းဆုံး ၆ လုံး)',
      'auth/user-disabled': 'ဤအကောင့်သည် ပိတ်ပါသည်',
      'auth/user-not-found': 'ဤအီးမေးလ်ဖြင့် အကောင့်မရှိပါ',
      'auth/wrong-password': 'စကားဝှက်မှားနေပါသည်',
      'auth/too-many-requests': 'အရမ်းများနေပါသည်၊ ကျေးဇူးပြု၍ ခဏစောင့်ပါ',
      'auth/network-request-failed': 'အင်တာနက်ချိတ်ဆက်မှု မအောင်မြင်ပါ'
    };
    
    return messages[code] || 'အမှားဖြစ်ပွားနေပါသည်';
  }
}

// Export singleton instance
export const firebaseAuth = new FirebaseAuth();
export default firebaseAuth;