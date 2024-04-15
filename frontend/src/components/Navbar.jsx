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
      <Toolbar className='nav' sx={{ justifyContent: 'space-between', bgcolor:"snow" }}>
        <Typography variant="h5" sx={{color:"orange", fontWeight:"800", fontFamily:"Montserrat", display: 'flex', alignItems: 'center'}}>
          <img src="/images/pngwing.com (1).png" alt="Logo" style={{ marginRight: '10px', height: '30px' }} />
          TASTIFY
        </Typography>
        <div>
          {isLoggedIn || isSignedUp ? (
            <>
              <Link to="/cart" style={{textDecoration: 'none'}}>
                <Button className='btn' sx={{color:"red", fontSize:"15px", fontFamily:"Montserrat", fontWeight:"800"}}>My Cart</Button>
              </Link>
              <Button onClick={handleLogout} className='btn' sx={{color:"red", fontSize:"15px", fontFamily:"Montserrat", fontWeight:"800"}}>Logout</Button>
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
