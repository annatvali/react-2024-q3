import { createContext, useContext, ReactNode } from 'react';
import { Theme } from '../types/types';
import { useDispatch, useSelector } from 'react-redux';
import { PokemonState, setTheme } from '../features/PokemonSlice';

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
  const dispatch = useDispatch();
  const theme = useSelector((state: PokemonState) => state.pokemon.theme);

  const toggleTheme = (): void => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
    dispatch(setTheme(newTheme));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeProvider, useTheme };
