import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Cart from '../pages/Cart';

function Navbar() {
  // State to track user's login status
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
  // State to track user's sign-up status
  const [isSignedUp, setIsSignedUp] = useState(false);

  // Function to handle logout
  const handleLogout = () => {
    // Remove the auth token from local storage
    localStorage.removeItem('authToken');
    // Update isLoggedIn state to false
    setIsLoggedIn(false);
  };

  // Function to handle user signup
  const handleSignup = () => {
    // Update isSignedUp state to true after successful signup
    setIsSignedUp(true);
  };

  return (
    <AppBar position="fixed">
      <Toolbar className='nav' sx={{ justifyContent: 'space-between', bgcolor:"silver" }}>
        <Typography variant="h4" sx={{color:"red", fontWeight:"800"}}>
          ZWIGATO
        </Typography>
        <div>
          {/* Conditional rendering based on whether the user is logged in or signed up */}
          {isLoggedIn || isSignedUp ? (
            // Show logout button and my cart if user is logged in or signed up
            <>
              <Link to="/cart" style={{textDecoration: 'none'}}>
                <Button className='btn' sx={{color:"red", fontSize:"20px"}}>My Cart</Button>
              </Link>
              <Button onClick={handleLogout} className='btn' sx={{color:"red", fontSize:"20px"}}>Logout</Button>
            </>
          ) : (
            // Show login and signup buttons if user is not logged in or signed up
            <>
              <Link to="/login" style={{textDecoration: 'none'}}>
                <Button className='btn' sx={{color:"red", fontSize:"20px"}}>Login</Button>
              </Link>
              <Link to="/createuser" style={{textDecoration: 'none'}}>
                <Button onClick={handleSignup} className='btn' sx={{color:"red", fontSize:"20px"}}>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
