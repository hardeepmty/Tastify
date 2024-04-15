import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('authToken'));
  
  const [isSignedUp, setIsSignedUp] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
  };

 
  const handleSignup = () => {
    setIsSignedUp(true);
  };

  return (
    <AppBar position="fixed">
      <Toolbar className='nav' sx={{ justifyContent: 'space-between', bgcolor:"silver" }}>
        <Typography variant="h4" sx={{color:"red", fontWeight:"800"}}>
          ZWIGATO
        </Typography>
        <div>
          {isLoggedIn || isSignedUp ? (
            <>
              <Link to="/cart" style={{textDecoration: 'none'}}>
                <Button className='btn' sx={{color:"red", fontSize:"20px"}}>My Cart</Button>
              </Link>
              <Button onClick={handleLogout} className='btn' sx={{color:"red", fontSize:"20px"}}>Logout</Button>
            </>
          ) : (
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