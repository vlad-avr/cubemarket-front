import React, { useState } from 'react';

const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value); // Update the searchText state
  };

  // Function to log search text to the console
  const handleSearchClick = () => {
    console.log(searchTerm); // Log the current search text
  };

  return (
    <div>
      <nav>
        <ul>
          <li className='sign_up'><a href="/registration">Sign up</a></li>
          <li className='sign_in'><a href="/auth">Sign in</a></li>
        </ul>
      </nav>
      <h1>Welcome to the Marketplace</h1>
      <div className="search-container">
      <input
        type="text"
        placeholder="Search for products..."
        value={searchTerm} // Bind input value to state
        onChange={handleInputChange} // Handle input change
      />
      <button className="search-button" onClick={handleSearchClick}>
        Search
      </button>
    </div>
    </div>
  );
};

export default MainPage;