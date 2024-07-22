// src/__tests__/LoginPage.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import '@testing-library/jest-dom/extend-expect';

// Mock global fetch
const mockFetch = jest.fn();

global.fetch = mockFetch;

test('renders LoginPage with form fields and button', () => {
  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );

  // Check if form elements are rendered
  expect(screen.getByLabelText('Username')).toBeInTheDocument();
  expect(screen.getByLabelText('Password')).toBeInTheDocument();
  expect(screen.getByText('Login')).toBeInTheDocument();
});

test('submits form and navigates on successful login', async () => {
  // Mock successful login response
  mockFetch.mockResolvedValueOnce({ status: 200 });

  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );

  // Fill in form fields
  fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });

  // Submit form
  fireEvent.click(screen.getByText('Login'));

  // Check if localStorage.setItem was called
  await waitFor(() => {
    expect(localStorage.getItem('userId')).toBe('testuser');
  });
});

test('displays error on failed login', async () => {
  // Mock failed login response
  mockFetch.mockResolvedValueOnce({ status: 401 });

  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );

  // Fill in form fields
  fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'wrongpassword' } });

  // Submit form
  fireEvent.click(screen.getByText('Login'));

  // Check if error message is displayed
  await waitFor(() => {
    expect(screen.getByText('Invalid username or password')).toBeInTheDocument();
  });
});

test('handles fetch error', async () => {
  // Mock fetch to throw an error
  mockFetch.mockRejectedValueOnce(new Error('Network error'));

  render(
    <MemoryRouter>
      <LoginPage />
    </MemoryRouter>
  );

  // Fill in form fields
  fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'testuser' } });
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });

  // Submit form
  fireEvent.click(screen.getByText('Login'));

  // Check if error message is displayed
  await waitFor(() => {
    expect(screen.getByText('Invalid username or password')).toBeInTheDocument();
  });
});
