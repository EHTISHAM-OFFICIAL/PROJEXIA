import { createContext, useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import type { User } from 'firebase/auth';
import { authService } from '../services/authService';
import { getUserProfile, signInWithUsername } from '../services/userService';
import type { UserProfile } from '../types/user';

export interface AuthContextValue {
  user: User | null;
  profile: UserProfile | null;
  isAdmin: boolean;
  loading: boolean;
  refreshingAccount: boolean;
  accountError: string | null;
  refreshAccount: () => Promise<void>;
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
  const [refreshingAccount, setRefreshingAccount] = useState(false);
  const [accountError, setAccountError] = useState<string | null>(null);
  const accountLoadId = useRef(0);

  useEffect(() => {
    const unsubscribe = authService.onAuthChange(async (nextUser) => {
      const loadId = ++accountLoadId.current;
      setUser(nextUser);
      setProfile(null);
      setIsAdmin(false);
      setAccountError(null);

      if (!nextUser) {
        setProfile(null);
        setIsAdmin(false);
        setLoading(false);
        setRefreshingAccount(false);
        return;
      }

      setLoading(true);
      try {
        const [admin, nextProfile] = await Promise.all([
          authService.isAdmin(nextUser.uid),
          getUserProfile(nextUser.uid),
        ]);
        // Ignore a slower response if the signed-in account changed meanwhile.
        if (accountLoadId.current !== loadId) return;
        setIsAdmin(admin);
        setProfile(nextProfile);
        if (!nextProfile) {
          setAccountError('Your account profile could not be loaded. Refresh your account details to try again.');
        }
      } catch {
        if (accountLoadId.current !== loadId) return;
        setAccountError('Your account details could not be loaded. Check your connection and refresh to try again.');
      } finally {
        if (accountLoadId.current === loadId) setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const refreshAccount = useCallback(async () => {
    const currentUser = user;
    if (!currentUser) return;

    const loadId = ++accountLoadId.current;
    setRefreshingAccount(true);
    setAccountError(null);
    try {
      const [admin, nextProfile] = await Promise.all([
        authService.isAdmin(currentUser.uid),
        getUserProfile(currentUser.uid),
      ]);
      if (accountLoadId.current !== loadId) return;
      setIsAdmin(admin);
      setProfile(nextProfile);
      if (!nextProfile) {
        setAccountError('We could not find a saved profile for this account. Your sign-in email may still be available below.');
      }
    } catch {
      if (accountLoadId.current === loadId) {
        setAccountError('Could not refresh your account details. Please check your connection and try again.');
      }
    } finally {
      if (accountLoadId.current === loadId) setRefreshingAccount(false);
    }
  }, [user]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      profile,
      isAdmin,
      loading,
      refreshingAccount,
      accountError,
      refreshAccount,
      signIn: async (email, password) => {
        setLoading(true);
        try {
          await authService.signIn(email, password);
        } catch (error) {
          setLoading(false);
          throw error;
        }
      },
      signInWithUsername: async (username, password) => {
        setLoading(true);
        try {
          await signInWithUsername(username, password);
        } catch (error) {
          setLoading(false);
          throw error;
        }
      },
      signOut: async () => {
        await authService.signOut();
      },
    }),
    [user, profile, isAdmin, loading, refreshingAccount, accountError, refreshAccount],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
