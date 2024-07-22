import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BookListPage from './pages/BookListPage';
// import LoginPage from './pages/LoginPage';
// import RegisterPage from './pages/RegisterPage';
// import BookListPage from './pages/BookListPage';
import CartPage from './pages/CartPage';
// import OrderConfirmationPage from './pages/OrderConfirmationPage';

const App = () => {
  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path='/home' element={<BookListPage/>} />
          <Route path='/checkout' element={<CartPage/>} />
          {/* {/* <Route path="/login" component={LoginPage} /> */}
          {/* <Route path="/register" component={RegisterPage} />
          <Route path="/books" component={BookListPage} />
          <Route path="/cart" component={CartPage} />
          <Route path="/order-confirmation" component={OrderConfirmationPage} /> */} 
        </Routes>
      </CartProvider>
    </Router>
  );
};

export default App;
