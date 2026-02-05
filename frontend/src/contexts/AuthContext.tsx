import React, { createContext, useContext, useMemo, useState } from 'react';

type AuthState = {
  userId: string | null;
  role: 'student' | 'teacher' | 'admin' | 'parent' | null;
};

type AuthContextValue = AuthState & {
  login: (userId: string, role: AuthState['role']) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({ userId: null, role: null });

  const value = useMemo<AuthContextValue>(
    () => ({
      ...state,
      login: (userId, role) => setState({ userId, role }),
      logout: () => setState({ userId: null, role: null })
    }),
    [state]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
};
