import { useCallback, useState } from 'react';

export function useLoading() {
  const [isLoading, setIsLoading] = useState(true);
  const startLoading = useCallback(() => setIsLoading(true), []);
  const stopLoading = useCallback(() => setIsLoading(false), []);

  return { isLoading, startLoading, stopLoading };
}
