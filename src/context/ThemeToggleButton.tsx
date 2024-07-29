import { useTheme } from './ThemeContext';
import { Icon } from '@iconify/react';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={`flex justify-between items-center w-full bg-blue-400 p-2 text-white ${theme === 'dark' ? 'bg-lightBlue' : 'bg-darkBlue'}`}
      onClick={toggleTheme}
    >
      <span>
        Click to switch to{' '}
        <span className="font-bold text-md">
          {theme === 'light' ? 'light' : 'dark'}
        </span>{' '}
        mode
      </span>
      {theme === 'dark' ? (
        <Icon icon="mingcute:sun-fill" className="text-2xl ml-2" />
      ) : (
        <Icon icon="mingcute:moon-fill" className="text-2xl ml-2" />
      )}
    </button>
  );
};

export default ThemeToggleButton;
