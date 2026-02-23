import React, { createContext, useContext, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('erasmus_auth') === 'true';
  });

  const login = async (password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.functions.invoke('verify-password', {
        body: { password },
      });

      if (error) {
        console.error('Login error:', error);
        return false;
      }

      if (data?.success) {
        setIsAuthenticated(true);
        sessionStorage.setItem('erasmus_auth', 'true');
        return true;
      }

      return false;
    } catch (e) {
      console.error('Login error:', e);
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('erasmus_auth');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
