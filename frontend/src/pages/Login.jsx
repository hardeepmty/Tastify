import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/loginuser', {
        email,
        password
      });
      console.log('Login successful:', response.data);
      alert('Login successful');

      localStorage.setItem('userEmail', email); // Corrected localStorage setting

      localStorage.setItem('authToken', response.data.token);
      console.log(localStorage.getItem('authToken'));
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <form style={{ width: '100%', maxWidth: 400 }} onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: 20 }}>Login</h2>
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
        <button
          type="submit"
          style={{ width: '100%', padding: 10, backgroundColor: '#1976d2', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          Login
        </button>
        <div style={{ marginTop: 20, textAlign: 'center' }}>
          <span>New user? </span>
          <Link to="/createuser" style={{ textDecoration: 'none', color: '#1976d2', fontWeight: 'bold' }}>Sign up here</Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
