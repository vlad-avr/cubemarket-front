import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import ProductsPage from './components/ProductsPage';
import Auth from './components/Auth';
import './App.css'
import Layout from './components/Layout';
import Registration from './components/Registration';
import PersonalPage from './components/PersonalPage';
import ManageProducts from './components/ManageProducts';
import ManageUsers from './components/ManageUsers';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path="registration" element={<Registration />} />
          <Route path="auth" element={<Auth />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="personal" element={<PersonalPage />} />
          <Route path="manage_products" element={<ManageProducts />} />
          <Route path="manage_users" element={<ManageUsers />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;