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
  return <RouterProvider router={router} />;
};

export default App;
