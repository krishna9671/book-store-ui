// src/components/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/RegisterPage.css';
import { API_BASE_URL } from '../config/apiConfig';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
        const response = await fetch(`${API_BASE_URL}/user/register?username=${username}&password=${password}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            }
          });
      if (response.status === 201) {
        navigate('/login');
      }
    } catch (err) {
      setError('Failed to register');
    }
  };

  return (
    <div className="register-container">
      <h1>Registration</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
