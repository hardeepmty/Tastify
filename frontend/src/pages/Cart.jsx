import React from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer';
import axios from 'axios';
import { Table, TableHead, TableBody, TableRow, TableCell, Button, TextField, Typography } from '@mui/material'; // Importing MUI components

const Cart = () => {
  const cart = useCart();
  const dispatch = useDispatchCart();

  const handleDeleteFromCart = (itemId) => {
    dispatch({ type: 'DELETE', id: itemId });
  };

  const handleUpdateCart = (itemId, newQty) => {
    dispatch({ type: 'UPDATE', id: itemId, qty: newQty });
  };

  if (cart.length === 0) {
    return (
      <div>
        <Typography variant='h6' align='center' mt={5}>
          The cart is empty
        </Typography>
      </div>
    );
  }

  const totalAmount = cart.reduce((total, item) => {
    const qty = parseFloat(item.qty);
    const price = parseFloat(item.price);
    
    if (!isNaN(qty) && !isNaN(price)) {
      return total + qty * price;
    } else {
      console.error(`Invalid quantity or price for item: ${item.name}`);
      return total;
    }
  }, 0);

  const handleCheckout = async () => {
    try {
      const userEmail = localStorage.getItem('userEmail');
      const response = await axios.post("http://localhost:5000/api/orderData", {
        order_: {
          data: cart,
          date: new Date().toDateString()
        },
        email: userEmail
      });
  
      if (response.status === 200) {
        console.log('Checkout successful!', response.data);
        dispatch({ type: 'DROP' });
      } else {
        console.error('Checkout failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };
  
  return (
    <div>
      <Typography variant='h4' sx={{fontWeight:"800", fontFamily:"Montserrat", textAlign:"center"}}>My Cart</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.map((item, index) => (
            <TableRow key={index + 1}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>
                <TextField
                  type="number"
                  variant="outlined"
                  size="small"
                  inputProps={{ min: 1 }}
                  value={item.qty}
                  onChange={(e) => handleUpdateCart(item.id, parseInt(e.target.value))}
                />
              </TableCell>
              <TableCell>{item.price}</TableCell>
              <TableCell>{parseFloat(item.qty) * parseFloat(item.price)}</TableCell>
              <TableCell>
                <Button variant="contained" color="error" onClick={() => handleDeleteFromCart(item.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Typography variant='h4'>Total Amount: ₹{totalAmount.toFixed(2)}</Typography>
      <Button variant="contained" color="primary" onClick={handleCheckout}>
        Checkout
      </Button>
    </div>
  );
};

export default Cart;
