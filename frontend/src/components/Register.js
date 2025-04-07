// src/components/Register.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS

import bg1 from '../assets/images/bg1.jpg';
import bg2 from '../assets/images/bg2.jpg';
import bg3 from '../assets/images/bg3.jpg';
import bg4 from '../assets/images/bg4.jpg';
import logo from '../assets/images/logo.png'; // Import logo

// Array of background images
const images = [bg1, bg2, bg3, bg4];

function Register() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  // Slide transition every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle registration submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert('✅ Registration successful! Redirecting to login...');
      navigate('/login'); // Redirect to login after registration
    } else {
      alert('❗ Error during registration');
    }
  };

  return (
    <div className="container-fluid register-container">
      {/* Background slideshow */}
      <button className="back-button" onClick={() => navigate(-1)}>⬅ Back</button>
      <div className="slideshow-container">
        {images.map((image, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="row justify-content-center align-items-center vh-100">
        <div className="col-md-6 col-lg-4 text-center register-content">
          {/* Logo Section */}
          <div className="logo-container">
            <img src={logo} alt="Logo" className="logo" />
          </div>

          <h2 className="text-white mb-3">📝 Customer Registration</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Mobile Number"
              onChange={handleChange}
              required
            />

            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
