const express = require('express');
const router = express.Router();
const Order = require('../models/Orders');

router.post('/orderData', async (req, res) => {
  console.log(5);
  try {
    const userEmail = req.body.email;
    const orderData = req.body.order_.data;
    const orderDate = req.body.order._date;

    // Construct the order object
    const order = {
      email: userEmail,
      date: orderDate,
      items: orderData
    };

    // Save the order to the database
    await Order.create(order);

    // Send a success response
    res.status(200).json({ success: true, message: 'Order placed successfully!' });

    // Clear the cart by sending a success response
    res.status(200).json({ success: true, message: 'Cart cleared successfully!' });
  } catch (error) {
    // Handle errors and send an error response
    console.error('Error during order placement:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

module.exports = router;
