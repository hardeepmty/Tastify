import React, { useEffect, useRef, useState } from 'react';
import { useDispatchCart } from './ContextReducer';
import axios from 'axios'; // Import Axios

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

    // Make an HTTP POST request to save the item to the user's cart in the backend
    try {
      await axios.post('http://localhost:5000/api/add-to-cart', {
        itemId: foodItem._id,
        name: foodItem.name,
        price: parsedFinalPrice,
        qty: parsedQty,
        size: size
      });
      console.log('Item added to cart in the backend.');
    } catch (error) {
      console.error('Error adding item to cart in the backend:', error);
    }
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
    <div>
      <div className='card mt-3' style={{ width: '18rem', maxHeight: '360px', marginTop: '80px', backgroundColor: 'grey' }}>
        <img className='pics' src={img} alt={name} style={{ width: '100%' }} />
        <div className='card-body'>
          <h5 className='card-title'>{name}</h5>
          <p className='card-text'>{description}</p>
          <div className='container w-100'>
            {/* Select for quantity */}
            <select className='m-2 h-100 w-100 bg-success' onChange={e => setQty(e.target.value)}>
              {Array.from(Array(6), (_, index) => (
                <option key={index + 1} value={index + 1}>{index + 1}</option>
              ))}
            </select>

            {/* Select for options */}
            <select className='m-2 h-100 bg-sucess rounded' ref={priceRef} onChange={e => setSize(e.target.value)}>
              {/* Mapping allOptions */}
              {allOptions.map(option => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>

            {/* Display total price */}
            <div className='d-inline h-100'>
              {finalPrice}
              </div>
          </div>
          <hr />
          {/* Button to add item to cart */}
          <button className={'btn btn-success justify-center ms-2'} onClick={handleAddToCart}>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
