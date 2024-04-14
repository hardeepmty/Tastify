import React from 'react';
import { useCart, useDispatchCart } from '../components/ContextReducer'; // Importing useCart and useDispatchCart hooks
import axios from 'axios';

const Cart = () => {
  const cart = useCart(); // Accessing the cart state
  const dispatch = useDispatchCart(); // Accessing the dispatch function

  // Function to handle deletion of an item from the cart
  const handleDeleteFromCart = (itemId) => {
    // Dispatch an action to delete the item from the cart
    dispatch({ type: 'DELETE', id: itemId });
  };

  // Function to handle updating quantity of an item in the cart
  const handleUpdateCart = (itemId, newQty) => {
    // Dispatch an action to update the quantity of the item in the cart
    dispatch({ type: 'UPDATE', id: itemId, qty: newQty });
  };

  if (cart.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The cart is empty</div>
      </div>
    );
  }

  // Calculate the total amount
  const totalAmount = cart.reduce((total, item) => {
    // Parse qty and price to ensure they are numbers
    const qty = parseFloat(item.qty);
    const price = parseFloat(item.price);
    
    // Check if qty and price are valid numbers
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
          data: cart, // Using the cart data here
          date: new Date().toDateString()
        },
        email: userEmail
      });
  
      // Check if the request was successful
      if (response.status === 200) {
        console.log('Checkout successful!', response.data);
        // Dispatch the DROP action to clear the cart
        dispatch({ type: 'DROP' });
      } else {
        console.error('Checkout failed with status:', response.status);
      }
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error during checkout:', error);
    }
  };
  
  return (
    <div>
      <h2>Cart</h2>
      <table className="table">
        <thead className='text-success fs-4'>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Name</th>
            <th scope='col'>Quantity</th>
            <th scope='col'>Price</th>
            <th scope='col'>Amount</th>
            <th scope='col'>Actions</th> {/* Added column for actions */}
          </tr>
        </thead>
        <tbody>
          {/* Iterate over each item in the cart */}
          {cart.map((item, index) => (
            <tr key={index + 1}>
              <th scope='row'>{index + 1}</th>
              <td>{item.name}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  value={item.qty}
                  onChange={(e) => handleUpdateCart(item.id, parseInt(e.target.value))}
                />
              </td>
              <td>{item.price}</td>
              <td>{parseFloat(item.qty) * parseFloat(item.price)}</td> {/* Calculating the amount */}
              <td>
                <button className="btn btn-danger" onClick={() => handleDeleteFromCart(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Checkout button */}
      <button className="btn btn-primary" onClick={handleCheckout}>
        Checkout
      </button>
      {/* Display total amount */}
      <div>Total Amount: ${totalAmount.toFixed(2)}</div> {/* Ensure totalAmount is formatted with two decimal places */}
    </div>
  );
};

export default Cart;
