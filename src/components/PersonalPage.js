import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PersonalPage.css'

const PersonalPage = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    balance: 1000,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isTransferring, setIsTransferring] = useState(false);
  const [formData, setFormData] = useState({
    name: userInfo.name,
    password: '',
  });
  const [transferAmount, setTransferAmount] = useState('');
  const navigate = useNavigate();

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setUserInfo({ ...userInfo, name: formData.name });
    setIsEditing(false);
    alert('Personal data updated successfully!');
  };

  const handleTransferChange = (e) => {
    setTransferAmount(e.target.value);
  };

  const handleTransferSubmit = (e) => {
    e.preventDefault();
    const amount = parseFloat(transferAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }
    setUserInfo({ ...userInfo, balance: userInfo.balance + amount });
    setTransferAmount('');
    setIsTransferring(false);
    alert(`Successfully added $${amount} to your balance!`);
  };

  const handleSignOut = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="personal-page">
      <h2>Personal Page</h2>
      <div className="personal-info">
        <p><strong>Name:</strong> {userInfo.name}</p>
        <p><strong>Email:</strong> {userInfo.email}</p>
        <p><strong>Financial Balance:</strong> ${userInfo.balance.toFixed(2)}</p>
        <button className="pp_button" onClick={() => setIsEditing(!isEditing)}>Edit Personal Data</button>
        <button className="pp_button" onClick={() => setIsTransferring(!isTransferring)}>Transfer Funds</button>
        <button className="pp_button" onClick={() => navigate('/')}>Main Page</button>
        <button className="pp_button" onClick={handleSignOut}>Sign Out</button>

        {/* Show Manage Products button for all users */}
        <button className="pp_button" onClick={() => navigate('/manage_products')}>Manage Products</button>

        {/* Show Manage Users button only for admins */}
        {userInfo.role === 'admin' && (
          <button className="pp_button" onClick={() => navigate('/manage_users')}>Manage Users</button>
        )}
      </div>

      {isEditing && (
        <form onSubmit={handleEditSubmit} className="form-container">
          <h3>Edit Personal Data</h3>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              required
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleFormChange}
              required
            />
          </label>
          <br />
          <button className="pp_button" type="submit">Save</button>
          <button className="pp_button cancel" type="button" onClick={() => setIsEditing(false)}>Cancel</button>
        </form>
      )}

      {isTransferring && (
        <form onSubmit={handleTransferSubmit} className="form-container">
          <h3>Transfer Funds</h3>
          <label>
            Amount:
            <input
              type="number"
              value={transferAmount}
              onChange={handleTransferChange}
              required
            />
          </label>
          <br />
          <button className="pp_button" type="submit">Transfer</button>
          <button className="pp_button cancel" type="button" onClick={() => setIsTransferring(false)}>Cancel</button>
        </form>
      )}
    </div>
  );
};

export default PersonalPage;
