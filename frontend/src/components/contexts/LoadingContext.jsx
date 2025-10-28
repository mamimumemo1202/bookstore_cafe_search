import { createContext, useContext, useState, useCallback } from 'react';

const LoadingContext = createContext(null);

export function LoadingProvider({ children, defaultLoading = false }) {
  const [isLoading, setIsLoading] = useState(defaultLoading);

  const startLoading = useCallback(() => setIsLoading(true), []);
  const stopLoading  = useCallback(() => setIsLoading(false), []);

  const withLoading = useCallback(async (fn) => {
    startLoading();
    try {
      return await fn();
    } finally {
      stopLoading();
    }
  }, [startLoading, stopLoading]);

  return (
    <LoadingContext.Provider value={{ isLoading, startLoading, stopLoading, withLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const ctx = useContext(LoadingContext);
  if (!ctx) throw new Error('useLoading must be used inside <LoadingProvider>');
  return ctx;
}