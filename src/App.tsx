import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingPageLayout from './layout/LandingPageLayout';
import Home from './routes/Home';
import AboutUs from './routes/AboutUs';
import PokemmDetails from './routes/PokemonDetails';
import NotFoundPage from './routes/NotFoundPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPageLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
        children: [
          {
            path: '/pokemon/:id',
            element: <PokemmDetails />,
          },
        ],
      },
      {
        path: '/aboutus',
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
  return <RouterProvider router={router} />;
};

export default App;
