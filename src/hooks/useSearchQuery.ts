import { useState, useEffect } from 'react';

const useSearchQuery = (
  key: string,
  initialValue: string
): [string, (value: string) => void] => {
  const [storedValue, setStoredValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ?? initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, storedValue);
    return () => {
      localStorage.setItem(key, storedValue);
    };
  }, [storedValue, key]);

  return [storedValue, setStoredValue];
};

export default useSearchQuery;
