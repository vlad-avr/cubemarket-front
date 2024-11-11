import React, { useState } from 'react';

const MainPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <nav>
        <ul>
          <li><a href="/client-registration">Client Registration</a></li>
          <li><a href="/seller-registration">Seller Registration</a></li>
          <li><a href="/admin-registration">Admin Registration</a></li>
        </ul>
      </nav>

      <div>
        <input 
          type="text" 
          placeholder="Search products..." 
          value={searchTerm} 
          onChange={handleSearch}
        />
      </div>

      <h1>Welcome to the Marketplace</h1>
    </div>
  );
};

export default MainPage;