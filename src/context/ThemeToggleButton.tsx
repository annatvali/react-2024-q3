import { useTheme } from './ThemeContext';
import { Icon } from '@iconify/react';

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={`flex justify-between items-center w-full bg-blue-400 p-2  ${theme === 'dark' ? 'bg-darkGray text-white' : 'bg-lightGray text-black'}`}
      onClick={toggleTheme}
    >
      <span>
        Click to switch to{' '}
        <span className="font-bold text-md">
          {theme === 'light' ? 'dark' : 'light'}
        </span>{' '}
        mode
      </span>
      {theme === 'dark' ? (
        <Icon
          icon="mingcute:sun-fill"
          className="text-yellow-200 text-2xl ml-2"
        />
      ) : (
        <Icon icon="mingcute:moon-fill" className="text-2xl ml-2 " />
      )}
    </button>
  );
};

export default ThemeToggleButton;
