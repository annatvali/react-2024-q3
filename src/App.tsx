// // import LandingPageLayout from './layout/LandingPageLayout';
// // import NotFoundPage from './routes/NotFoundPage';
// // import Home from './components/Home';
// import { ThemeProvider, useTheme } from './context/ThemeContext';
// import ThemeToggleButton from './context/ThemeToggleButton';
// import './index.css';
// // import PokemonDetails from './components/PokemonDetails';
// import Flayout from './components/Flayout';

// // const router = createBrowserRouter([
// //   {
// //     path: '/',
// //     element: <LandingPageLayout />,
// //     children: [
// //       {
// //         path: '/',
// //         element: <Navigate to="/page/1" />,
// //       },
// //       {
// //         path: '/page/:pageId',
// //         element: <Home />,
// //         children: [
// //           {
// //             path: '/page/:pageId/details/:detailsId',
// //             element: <PokemonDetails />,
// //           },
// //         ],
// //       },
// //       {
// //         path: '*',
// //         element: <NotFoundPage />,
// //       },
// //     ],
// //   },
// // ]);

// const App = () => {
//   const { theme } = useTheme();

//   return (
//     <div
//       className={
//         theme === 'dark' ? 'bg-darkGray text-white' : 'bg-lightGray text-black'
//       }
//     >
//       <ThemeToggleButton />
//       <RouterProvider router={router} />
//     </div>
//   );
// };

// const AppWithThemeProvider = () => (
//   <ThemeProvider>
//     <App />
//     <Flayout />
//   </ThemeProvider>
// );

// export default AppWithThemeProvider;
