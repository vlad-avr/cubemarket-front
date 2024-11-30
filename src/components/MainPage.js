import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check if the user is logged in from localStorage
  useEffect(() => {
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchClick = () => {
    navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
  };

  const handleSignOut = () => {
    localStorage.removeItem('user');
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
        <input
          type="text"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button className="search-button" onClick={handleSearchClick}>
          Search
        </button>
      </div>
    </div>
  );
};

export default MainPage;
