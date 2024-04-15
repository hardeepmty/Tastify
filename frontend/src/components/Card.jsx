import React, { useEffect, useRef, useState } from 'react';
import { useDispatchCart } from './ContextReducer';
import { Box, Card as MUICard, CardContent, CardMedia, Typography, Select, MenuItem, Button } from '@mui/material';
import axios from 'axios'; // Import Axios
import './Card.css';


const Card = ({ foodItem, options }) => {
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState('');
  const [finalPrice, setFinalPrice] = useState(0); // State to hold the final price
  
  // Extracting necessary details from foodItem
  const { name, description, price, img } = foodItem;
  
  // Accessing dispatch function using useDispatchCart hook
  const dispatch = useDispatchCart();

  const handleAddToCart = async () => {
    // Ensure qty is parsed as an integer
    const parsedQty = parseInt(qty);
    // Ensure finalPrice is calculated based on parsedQty and size
    const selectedOption = options.find(option => option[size]);
    const parsedFinalPrice = selectedOption ? parsedQty * parseInt(selectedOption[size]) : price;

    // Dispatch an action to add the item to the cart
    dispatch({ 
      type: 'ADD',
      id: foodItem._id, 
      name: foodItem.name, 
      price: parsedFinalPrice, 
      qty: parsedQty, 
      size: size 
    });
    
    // Log the item information
    console.log('Item added to cart:', {
      id: foodItem._id,
      name: foodItem.name,
      description: foodItem.description,
      price: parsedFinalPrice,
      quantity: parsedQty,
      size: size,
      image: img
    });
  };
  

  // Mapping all options for dropdown
  const allOptions = options.flatMap(option => Object.keys(option));
  
  const priceRef = useRef();

  // Update final price when size changes
  useEffect(() => {
    const selectedOption = options.find(option => option[size]);
    if (selectedOption) {
      setFinalPrice(qty * parseInt(selectedOption[size]));
    }
  }, [size, qty, options]);

  return (
    <Box mt={3} className="cardContainer" >
      <MUICard style={{ width: '18rem', maxHeight: '360px', marginTop: '8px', backgroundColor: 'silver',borderRadius:"15px"  }}>
        <CardMedia component="img" src={img} alt={name} style={{ width: '100%',height:"183px" }} />
        <CardContent>
          <Typography variant="h5" component="h2" sx={{fontFamily:"Montserrat", fontWeight:"bold"}}>{name}</Typography>
          <Typography variant="body2" component="p" sx={{fontFamily:"Montserrat", fontWeight:"medium"}}>{description}</Typography>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            {/* Select for quantity */}
            <Select value={qty} onChange={e => setQty(e.target.value)} variant="outlined" sx={{height:"30px"}}>
              {Array.from(Array(6), (_, index) => (
                <MenuItem key={index + 1} value={index + 1}>{index + 1}</MenuItem>
              ))}
            </Select>

            {/* Select for options */}
            <Select value={size} onChange={e => setSize(e.target.value)} variant="outlined" sx={{height:"30px"}}>
              {/* Mapping allOptions */}
              {allOptions.map(option => (
                <MenuItem key={option} value={option}>{option}</MenuItem>
              ))}
            </Select>

            {/* Display total price */}
            <Typography variant="body1">₹{finalPrice}</Typography>
          </Box>
          <hr />
          {/* Button to add item to cart */}
          <Button variant="contained" color="success" onClick={handleAddToCart}>
            Add To Cart
          </Button>
        </CardContent>
      </MUICard>
    </Box>
  );
};

export default Card;
