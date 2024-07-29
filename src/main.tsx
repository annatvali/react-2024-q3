import ReactDOM from 'react-dom/client';
import './index.css';
import ErrorBoundary from './components/errors/ErrorBoundary.tsx';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';
import AppWithThemeProvider from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <ErrorBoundary fallback={<div>Something went wrong</div>}>
      <AppWithThemeProvider />
    </ErrorBoundary>
  </Provider>
);
