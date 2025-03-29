import { createContext, useContext, useEffect, useState } from 'react';
import secureStorage from './secure-storage';

interface User {
  token?: string;
}

interface GlobalContextType {
  isLoggedIn: boolean;
  user: User | null;
  loading: boolean;
  setUser: (user: User) => void;
}

export const GlobalContext = createContext<GlobalContextType>({
  isLoggedIn: false,
  user: null,
  loading: false,
  setUser: () => {},
});

export const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const isLoggedIn = !!user;

  useEffect(() => {
    (async () => {
      setLoading(true);
      const token = await secureStorage.getItem('auth_token');
      setUser({ token: token || undefined });

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    })();
  }, []);

  return (
    <GlobalContext.Provider value={{ isLoggedIn, loading, user, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};
