import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import ClientRegistration from './components/ClientRegistration';
import SellerRegistration from './components/SellerRegistration';
import AdminRegistration from './components/AdminRegistration';
import ProductsPage from './components/ProductsPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/client-registration" element={<ClientRegistration />} />
        <Route path="/seller-registration" element={<SellerRegistration />} />
        <Route path="/admin-registration" element={<AdminRegistration />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </Router>
  );
};

export default App;