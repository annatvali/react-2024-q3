import { useContext } from 'react';
import { ThemeContext } from './ThemeProvider';

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme should only be used inside a ThemeProvider!');
  }
  return context;
};

export default useTheme;
