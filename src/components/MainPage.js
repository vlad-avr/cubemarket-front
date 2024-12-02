import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [productLimit, setProductLimit] = useState(10); // Default limit
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if the user is logged in from localStorage
  useEffect(() => {
    const user = localStorage.getItem('token');
    setIsLoggedIn(!!user);
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleLimitChange = (event) => {
    const value = parseInt(event.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setProductLimit(value);
    }
  };

  const handleSearchClick = () => {
    const queryParams = new URLSearchParams({
      name: searchTerm || '',
      limit: productLimit || 10,
      offset: 0,
      delete: false,
    }).toString();
    navigate(`/products?${queryParams}`);
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div>
      <nav>
        <ul>
          {isLoggedIn ? (
            <>
              <li className="sign_up">
                <button onClick={() => navigate('/personal')}>Personal Page</button>
              </li>
              <li className="sign_up">
                <button onClick={handleSignOut}>Sign Out</button>
              </li>
            </>
          ) : (
            <>
              <li className="sign_up">
                <a href="/registration">Sign up</a>
              </li>
              <li className="sign_up">
                <a href="/auth">Sign in</a>
              </li>
            </>
          )}
        </ul>
      </nav>
      <h1>Welcome to the Marketplace</h1>
      <div className="search-container">
        <div>
          <label htmlFor="searchTerm">Search:</label>
          <input
            id="searchTerm"
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div>
          <label htmlFor="productLimit">Limit:</label>
          <input
            id="productLimit"
            type="number"
            placeholder="Number of products"
            value={productLimit}
            onChange={handleLimitChange}
            min="1"
          />
        </div>
        <button className="search-button" onClick={handleSearchClick}>
          Search
        </button>
      </div>
    </div>
  );
};

export default MainPage;
