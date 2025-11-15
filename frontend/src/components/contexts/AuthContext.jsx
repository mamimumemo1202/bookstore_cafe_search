import { createContext, useContext, useEffect, useState } from 'react';
import { validateToken } from '../../apis/auth';
import { getAuthInfo } from '../../apis';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const authInfo = getAuthInfo();
      if (!authInfo['access-token'] || !authInfo['client'] || !authInfo['uid']) {
        setIsLoggedIn(false);
        setUser(null);
        return;
      }

      try {
        const res = await validateToken();
        setUser(res.data.data);
      } catch {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
