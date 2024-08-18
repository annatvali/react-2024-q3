import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './routes/Main';
import UncontrolledForm from './routes/UncontrolledForm';
import HookForm from './routes/HookForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: 'uncontrolled-form',
        element: <UncontrolledForm />,
      },
      {
        path: 'hook-form',
        element: <HookForm />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
