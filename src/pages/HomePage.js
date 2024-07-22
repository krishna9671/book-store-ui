// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import LoginPage from './LoginPage';
import '../styles/HomePage.css';


const HomePage = () => {
  return (
    <div className="home-container">
      <h1>Welcome to Book Store</h1>
      <LoginPage />
      <p>
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default HomePage;
