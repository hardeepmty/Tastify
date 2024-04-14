const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.post('/foodData', async (req, res) => {
  try {
    const foodItems = await mongoose.connection.db.collection('food_items').find({}).toArray();
    const foodCategories = await mongoose.connection.db.collection('foodCategory').find({}).toArray();
    
    res.json({ foodItems, foodCategories });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
