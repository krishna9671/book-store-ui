// src/__tests__/RegisterPage.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RegisterPage from '../pages/RegisterPage';

test('renders RegisterPage with form fields and button', () => {
  render(
    <MemoryRouter>
      <RegisterPage />
    </MemoryRouter>
  );

  // Check if form elements are rendered
  expect(screen.getByLabelText('Username')).toBeInTheDocument();
  expect(screen.getByLabelText('Password')).toBeInTheDocument();
  expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
  expect(screen.getByText('Register')).toBeInTheDocument();
});

test('displays error message when passwords do not match', () => {
  render(
    <MemoryRouter>
      <RegisterPage />
    </MemoryRouter>
  );

  // Fill in form fields with mismatched passwords
  fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'newuser' } });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
  fireEvent.change(screen.getByLabelText('Confirm Password'), { target: { value: 'differentpassword' } });

  // Submit form
  fireEvent.click(screen.getByText('Registration'));

});
