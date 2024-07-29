import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme should only be used inside a ThemeProvider!');
  }
  return context;
}

const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // const savedTheme = localStorage.getItem('theme');
  const [theme, setTheme] = useState<Theme>('light');

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = (): void => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, useTheme };
