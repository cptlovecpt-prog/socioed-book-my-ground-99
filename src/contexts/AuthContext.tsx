import { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  name: string;
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  isSignedIn: boolean;
  signIn: (email: string, password: string) => boolean;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const signIn = (email: string, password: string): boolean => {
    // Check for admin credentials
    if (email === 'admin@bu.edu' && password === 'admin123') {
      setUser({
        name: 'Admin',
        email: email,
        isAdmin: true
      });
      return true;
    }
    
    // Regular user login (for demo purposes, accept any other email/password)
    if (email && password) {
      const name = email.split('@')[0];
      setUser({
        name: name.charAt(0).toUpperCase() + name.slice(1),
        email: email,
        isAdmin: false
      });
      return true;
    }
    
    return false;
  };

  const signOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      isSignedIn: !!user,
      signIn,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};