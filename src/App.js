import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MainPage from './components/MainPage';
import ProductsPage from './components/ProductsPage';
import Auth from './components/Auth';
import './App.css'
import Layout from './components/Layout';
import Registration from './components/Registration';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route path="/" element={<MainPage />} />
          <Route path='/registration' element={<Registration/>}/>
          <Route path='/auth' element={<Auth />} />
          <Route path="/products" element={<ProductsPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;