import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import LandingPageLayout from './layout/LandingPageLayout';
import Home from './routes/Home';
import AboutUs from './routes/AboutUs';
import PokemonDetails from './routes/PokemonDetails';
import NotFoundPage from './routes/NotFoundPage';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import ThemeToggleButton from './context/ThemeToggleButton';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPageLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/page/1" />,
      },
      {
        path: '/page/:pageId',
        element: <Home />,
        children: [
          {
            path: '/page/:pageId/details/:detailsId',
            element: <PokemonDetails />,
          },
        ],
      },
      {
        path: 'aboutus',
        element: <AboutUs />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

const App = () => {
  const { theme } = useTheme();

  return (
    <div
      className={theme === 'dark' ? 'bg-lightBlue text-black' : 'bg-darkBlue'}
    >
      <ThemeToggleButton />
      <RouterProvider router={router} />
    </div>
  );
};

const AppWithThemeProvider = () => (
  <ThemeProvider>
    <App />
  </ThemeProvider>
);

export default AppWithThemeProvider;
