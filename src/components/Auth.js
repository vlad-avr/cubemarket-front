import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

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
          email: data.email,
          name: data.name,
          balance: data.balance,
          role: data.role,
          blocked: data.blocked,
          token: data.token,
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
