import { createContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { User } from 'firebase/auth';
import { authService } from '../services/authService';
import { getUserProfile, signInWithUsername } from '../services/userService';
import type { UserProfile } from '../types/user';

export interface AuthContextValue {
  user: User | null;
  profile: UserProfile | null;
  isAdmin: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signInWithUsername: (username: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = authService.onAuthChange(async (nextUser) => {
      setUser(nextUser);

      if (!nextUser) {
        setProfile(null);
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      const [admin, nextProfile] = await Promise.all([
        authService.isAdmin(nextUser.uid),
        getUserProfile(nextUser.uid),
      ]);

      setIsAdmin(admin);
      setProfile(nextProfile);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      profile,
      isAdmin,
      loading,
      signIn: async (email, password) => {
        await authService.signIn(email, password);
      },
      signInWithUsername: async (username, password) => {
        await signInWithUsername(username, password);
      },
      signOut: async () => {
        await authService.signOut();
      },
    }),
    [user, profile, isAdmin, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
