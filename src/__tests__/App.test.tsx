import { describe, it, expect, test } from 'vitest';
import { render } from '@testing-library/react';
import { ThemeProvider } from '../context/ThemeProvider';
import { Provider } from 'react-redux';
import App from '../App';
import Flayout from '../components/Flayout';
import store from '../app/store';

test('demo', () => {
  expect(true).toBe(true);
});

describe('render', () => {
  it('renders the main page', () => {
    render(
      <Provider store={store}>
        <ThemeProvider>
          <App />
          <Flayout />
        </ThemeProvider>
      </Provider>
    );
    expect(true).toBeTruthy();
  });
});
