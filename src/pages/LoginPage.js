// src/components/LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config/apiConfig';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_BASE_URL}/user/login?username=${username}&password=${password}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (response.status === 200) {
        navigate('/home');
        localStorage.setItem('userId',username);
      }
      else if(response.status === 401) {
      setError('Invalid username or password');
      }
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-container">
      <h1>Login Section</h1>
      <form onSubmit={handleSubmit} >
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
        {error && <div className="error">{error}</div>}
        <button type="submit" className='button'>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
