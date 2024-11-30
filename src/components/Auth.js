import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  // Mock user data for testing purposes
  const mockUserData = {
    id: "12345",
    name: "John Doe",
    email: "johndoe@example.com",
    balance: 1000.0,
    role: "user",
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9", // A mock JWT token
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const goToMainPage = () => {
    navigate('/'); // Navigates to the main page
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(`Auth data: `, formData);

    try {
      const response = await fetch('http://localhost:5051/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);

        // Save the user data to localStorage
        const userData = {
          id: data.id,
          name: data.name,
          email: data.email,
          balance: data.balance || 0,
          role: data.role || 'user', // Assign default role if not provided
          token: data.token, // Store JWT token for future use
        };
        localStorage.setItem('user', JSON.stringify(userData));

        setMessage('Login successful!');
        navigate('/personal'); // Redirect to Personal Page
      } else {
        const error = await response.json();
        console.error('Login failed:', error);
        setMessage('Login failed: ' + (error.message || 'Unknown error'));
      }
    } catch (err) {
      console.error('Network error:', err);

      // For testing purposes: use mock data if API call fails
      localStorage.setItem('user', JSON.stringify(mockUserData));
      setMessage('Mock login successful! Testing data saved.');
      navigate('/personal'); // Redirect to Personal Page
    }
  };

  return (
    <div>
      <h2>Sign in</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign In</button>
      </form>
      {message && <p>{message}</p>}
      <button onClick={goToMainPage}>Back to Main Page</button> {/* Back button */}
    </div>
  );
};

export default Auth;
