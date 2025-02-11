import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { auth, db } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';

export type UserRole = 'system_admin' | 'church_admin' | 'leader' | 'staff' | 'member' | 'visitor';

interface UserData {
  uid: string;
  email: string | null;
  firstName: string;
  lastName: string;
  role: UserRole;
  churchId?: string;
  photoURL?: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  loading: boolean;
  error: string | null;
  refreshUserData: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  loading: true,
  error: null,
  refreshUserData: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = async (firebaseUser: User) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data() as UserData);
        setError(null);
      } else {
        setError('User data not found in database');
        console.error('User document does not exist for uid:', firebaseUser.uid);
      }
    } catch (err: any) {
      console.error('Error fetching user data:', err);
      setError(err.message);
    }
  };

  const refreshUserData = async () => {
    if (user) {
      await fetchUserData(user);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      try {
        if (firebaseUser) {
          // Get the ID token with force refresh
          const token = await firebaseUser.getIdToken(true);
          
          // Store the token in a cookie that middleware can access
          document.cookie = `__firebase_auth_token=${token}; path=/; max-age=3600; SameSite=Strict`;
          
          setUser(firebaseUser);
          await fetchUserData(firebaseUser);
        } else {
          // Clear everything if user is not authenticated
          setUser(null);
          setUserData(null);
          setError(null);
          // Clear the auth token cookie
          document.cookie = '__firebase_auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        }
      } catch (err: any) {
        console.error('Auth state change error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userData, loading, error, refreshUserData }}>
      {children}
    </AuthContext.Provider>
  );
}
