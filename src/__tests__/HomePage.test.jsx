import React from 'react';
import { render,act} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import HomePage from '../pages/HomePage';

test('renders HomePage with links', () => {
  const { getByText } = render(
    <MemoryRouter>
      <HomePage />
    </MemoryRouter>
  );
  expect(getByText('Welcome to Book Store')).toBeInTheDocument();
// //   expect(getByText('Login')).toBeInTheDocument();
// //   expect(getByText('Register')).toBeInTheDocument();
});

