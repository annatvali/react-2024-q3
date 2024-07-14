import { useState, useEffect } from 'react';

const useSearchQuery = (
  initialValue: string
): [string, (query: string) => void] => {
  const [searchQuery, setSearchQuery] = useState(() => {
    const storedQuery = localStorage.getItem('searchQuery');
    return storedQuery ? storedQuery : initialValue;
  });

  useEffect(() => {
    localStorage.setItem('searchQuery', searchQuery);
    return () => {
      localStorage.setItem('searchQuery', searchQuery);
    };
  }, [searchQuery]);

  return [searchQuery, setSearchQuery];
};

export default useSearchQuery;
