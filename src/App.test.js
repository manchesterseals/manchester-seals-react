import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './app/App';
import store from './app/store';

test('renders app title', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const titleElement = screen.getByText(/manchester seals/i);
  expect(titleElement).toBeInTheDocument();
});
