import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://tastify.onrender.com/api/createuser', {
        name,
        email, 
        password,
        location
      });
      console.log('User created successfully:', response.data);
      alert('User created successfully');
      navigate('/');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <form style={{ width: '100%', maxWidth: 400 }} onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: 20 }}>Sign Up</h2>
        <div style={{ marginBottom: 20 }}>
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%', padding: 10, marginTop: 5 }}
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: 10, marginTop: 5 }}
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: 10, marginTop: 5 }}
          />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            style={{ width: '100%', padding: 10, marginTop: 5 }}
          />
        </div>
        <button
          type="submit"
          style={{ width: '100%', padding: 10, backgroundColor: '#1976d2', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          Sign Up
        </button>
        <div style={{ marginTop: 20, textAlign: 'center' }}>
          <span>Already a user? </span>
          <Link to="/login" style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 'bold' }}>Log in</Link>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
