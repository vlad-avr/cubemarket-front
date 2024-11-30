import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Registration = () => {
  const [formData, setFormData] = useState({
    password: '',
    name: '',
    email: '',
  });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const navigate = useNavigate(); 

  // Validate form inputs
  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'name is required.';
    } else if (formData.name.length < 3) {
      newErrors.name = 'name must be at least 3 characters.';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format.';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // Clear individual field errors on change
  };

  const goToMainPage = () => {
    navigate('/'); // Navigates to the main page
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      return; // Stop if validation fails
    }

    console.log(`Registration data: `, formData);

    try {
      const response = await fetch('http://localhost:5051/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Registration successful:', data);
        setMessage('Registration successful!');
      } else {
        const error = await response.json();
        console.error('Registration failed:', error);
        setMessage('Registration failed: ' + (error.message || 'Unknown error'));
      }
    } catch (err) {
      console.error('Network error:', err);
      setMessage('Network error: Please try again later.');
    }
  };

  return (
    <div>
      <h2>Sign up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          {errors.name && <p style={{ color: 'red' }}>{errors.name}</p>}
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p style={{ color: 'red' }}>{errors.email}</p>}
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
      <button onClick={goToMainPage}>Back to Main Page</button> {/* Back button */}
    </div>
  );
};

export default Registration;
