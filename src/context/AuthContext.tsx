import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import {
  createAuthStubUser,
  findAuthStubUser,
  isValidStubOtp,
  isValidStubPassword,
  seededAuthUsers,
  type AuthRole,
  type AuthStubUser,
} from '../services/authStubService';

export type AuthUser = {
  id: string;
  emailOrPhone: string;
  name?: string;
  email?: string;
  role?: AuthRole;
} | null;

type ProfileUpdate = {
  name?: string;
  email?: string;
  emailOrPhone?: string;
};

type AuthContextValue = {
  user: AuthUser;
  isLoggedIn: boolean;
  login: (identifier: string, otpOrMarker: string, password: string, role?: AuthRole) => boolean;
  validateOtp: (identifier: string, otp: string, role?: AuthRole) => boolean;
  signUp: (
    phone: string,
    otp: string,
    password: string,
    name?: string,
    email?: string,
    role?: AuthRole,
  ) => boolean;
  updateProfile: (patch: ProfileUpdate) => void;
  /** Demo: replace with Google Sign-In SDK and your backend. */
  loginWithGoogle: () => void;
  loginWithWhatsApp: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser>(null);
  const [accounts, setAccounts] = useState<AuthStubUser[]>(seededAuthUsers);

  const login = useCallback(
    (identifier: string, otpOrMarker: string, password: string, role: AuthRole = 'customer') => {
      const account = findAuthStubUser(accounts, identifier, role);
      if (!account) {
        return false;
      }
      if (otpOrMarker !== 'verified' && !isValidStubOtp(account, otpOrMarker)) {
        return false;
      }
      if (password && !isValidStubPassword(account, password)) {
        return false;
      }

      setUser({
        id: account.id,
        emailOrPhone: account.phone,
        name: account.name,
        email: account.email,
        role: account.role,
      });
      return true;
    },
    [accounts],
  );

  const signUp = useCallback(
    (phone: string, _otp: string, password: string, name = '', email?: string, role: AuthRole = 'customer') => {
      const account = createAuthStubUser(accounts, { phone, password, name, email, role });
      if (!account) {
        return false;
      }
      setAccounts(current => [...current, account]);
      return true;
    },
    [accounts],
  );

  const validateOtp = useCallback(
    (identifier: string, otp: string, role?: AuthRole) => {
      const account = findAuthStubUser(accounts, identifier, role);
      return account ? isValidStubOtp(account, otp) : false;
    },
    [accounts],
  );

  const updateProfile = useCallback((patch: ProfileUpdate) => {
    setUser(prev => {
      if (!prev) {
        return prev;
      }
      return {
        ...prev,
        name: patch.name ?? prev.name,
        email: patch.email ?? prev.email,
        emailOrPhone: patch.emailOrPhone ?? prev.emailOrPhone,
      };
    });
  }, []);

  const loginWithGoogle = useCallback(() => {
    setUser({
      id: 'google-user',
      emailOrPhone: '9876543210',
      name: 'Google User',
      email: 'user@gmail.com',
      role: 'customer',
    });
  }, []);

  const loginWithWhatsApp = useCallback(() => {
    setUser({
      id: 'whatsapp-user',
      emailOrPhone: '9876543210',
      name: 'WhatsApp User',
      role: 'customer',
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoggedIn: user !== null,
      login,
      validateOtp,
      signUp,
      updateProfile,
      loginWithGoogle,
      loginWithWhatsApp,
      logout,
    }),
    [user, login, validateOtp, signUp, updateProfile, loginWithGoogle, loginWithWhatsApp, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
