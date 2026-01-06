import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type User = { name: string; email: string };

type AuthContextType = {
  user: User | null;
  isBooting: boolean;
  isSubmitting: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const KEYS = {
  SESSION_USER: 'session_user',
  STORED_USERS: 'stored_users', 
  STORED_CREDS: 'stored_creds', 
};

export type StoredUser = { name: string; email: string; password: string };

async function readUsers(): Promise<StoredUser[]> {
  const legacy = await AsyncStorage.getItem(KEYS.STORED_CREDS);
  const raw = await AsyncStorage.getItem(KEYS.STORED_USERS);

  if (raw) {
    try {
      const parsed = JSON.parse(raw) as StoredUser[];
      if (Array.isArray(parsed)) return parsed;
    } catch {}
  }

  if (legacy) {
    try {
      const single = JSON.parse(legacy) as StoredUser;
      if (single?.email) {
        const migrated = [single];
        await AsyncStorage.setItem(KEYS.STORED_USERS, JSON.stringify(migrated));
        await AsyncStorage.removeItem(KEYS.STORED_CREDS);
        return migrated;
      }
    } catch {}
  }

  return [];
}

async function writeUsers(users: StoredUser[]) {
  await AsyncStorage.setItem(KEYS.STORED_USERS, JSON.stringify(users));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isBooting, setIsBooting] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Restore session when app starts
  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(KEYS.SESSION_USER);
        if (raw) setUser(JSON.parse(raw));
      } finally {
        setIsBooting(false);
      }
    })();
  }, []);

  const signup = async (name: string, email: string, password: string) => {
    setIsSubmitting(true);
    try {
      const normalizedEmail = email.trim().toLowerCase();
      const cleanedName = name.trim();

      const users = await readUsers();

      const exists = users.some((u) => u.email.toLowerCase() === normalizedEmail);
      if (exists) {
        throw new Error('This email is already registered. Please login instead.');
      }

      const newUser: StoredUser = { name: cleanedName, email: normalizedEmail, password };
      const updated = [newUser, ...users]; 
      await writeUsers(updated);

      const sessionUser: User = { name: newUser.name, email: newUser.email };
      await AsyncStorage.setItem(KEYS.SESSION_USER, JSON.stringify(sessionUser));
      setUser(sessionUser);
    } finally {
      setIsSubmitting(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsSubmitting(true);
    try {
      const normalizedEmail = email.trim().toLowerCase();
      const users = await readUsers();

      if (users.length === 0) {
        throw new Error('No account found. Please sign up first.');
      }

      const match = users.find(
        (u) => u.email.toLowerCase() === normalizedEmail && u.password === password
      );

      if (!match) {
        throw new Error('Incorrect email or password.');
      }

      const sessionUser: User = { name: match.name, email: match.email };
      await AsyncStorage.setItem(KEYS.SESSION_USER, JSON.stringify(sessionUser));
      setUser(sessionUser);
    } finally {
      setIsSubmitting(false);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem(KEYS.SESSION_USER);
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, isBooting, isSubmitting, login, signup, logout }),
    [user, isBooting, isSubmitting]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
