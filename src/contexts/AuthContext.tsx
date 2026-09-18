import { createContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { User } from 'firebase/auth';
import { authService } from '../services/authService';

export interface AuthContextValue {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // `loading` stays true until both the auth state and the admin check resolve,
    // otherwise ProtectedRoute would briefly redirect a real admin to the login page.
    const unsubscribe = authService.onAuthChange(async (nextUser) => {
      setUser(nextUser);
      setIsAdmin(nextUser ? await authService.isAdmin(nextUser.uid) : false);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAdmin,
      loading,
      signIn: async (email, password) => {
        await authService.signIn(email, password);
      },
      signOut: async () => {
        await authService.signOut();
      },
    }),
    [user, isAdmin, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
