import '../styles/globals.css';
import type { AppProps } from 'next/app';
import LandingPageLayout from '../components/layout/LandingPageLayout';
import { ThemeProvider } from '../context/ThemeProvider';
import useTheme from '../context/useTheme';
import ThemeToggleButton from '../context/ThemeToggleButton';
import { Provider } from 'react-redux';
import store from '../app/store';
import Flyout from '../components/Flayout';

const App = ({ Component, pageProps, router }: AppProps) => {
  const { theme } = useTheme();

  return (
    <div
      className={
        theme === 'dark' ? 'bg-darkGray text-white' : 'bg-lightGray text-black'
      }
    >
      <ThemeToggleButton />
      <LandingPageLayout>
        <Component {...pageProps} router={router} />
      </LandingPageLayout>
      <Flyout />
    </div>
  );
};

const AppWithThemeProvider = ({ Component, pageProps, router }: AppProps) => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <App Component={Component} pageProps={pageProps} router={router} />
        <Flyout />
      </ThemeProvider>
    </Provider>
  );
};

export default AppWithThemeProvider;
