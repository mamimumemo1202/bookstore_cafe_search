import { createContext, use, useContext, useEffect, useState } from 'react';
import { validateToken } from '../../apis/auth';
import { getAuthInfo } from '../../apis';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const authInfo = getAuthInfo();
      if (!authInfo['access-token'] || !authInfo['client'] || !authInfo['uid']) {
        setIsLoggedIn(false);
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        const res = await validateToken();
        setIsLoggedIn(true);
        setUser(res.data.data);
      } catch (error) {
        //   if(error.response.status !== 401)
        setIsLoggedIn(false);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
