import React from 'react';
import { useCart } from '../components/ContextReducer'; // Importing useCart hook

const Cart = () => {
  const cart = useCart(); // Accessing the cart state

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

  const handleCheckout = () => {
    // Implement checkout logic here
    console.log('Checkout button clicked!');
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
          </tr>
        </thead>
        <tbody>
          {/* Iterate over each item in the cart */}
          {cart.map((item, index) => (
            <tr key={index + 1}> {/* Added key attribute */}
              <th scope='row'>{index + 1}</th>
              <td>{item.name}</td>
              <td>{item.qty}</td>
              <td>{item.price}</td>
              <td>{parseFloat(item.qty) * parseFloat(item.price)}</td> {/* Calculating the amount */}
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
