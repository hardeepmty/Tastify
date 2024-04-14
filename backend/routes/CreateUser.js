const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

// Route to create a new user
router.post("/createuser", [
  body('email').isEmail(),
  body('name').isLength({ min: 5 }),
  body('password').isLength({ min: 5 }).withMessage("Password must be at least 5 characters long")
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hash the password
    await User.create({
      name: req.body.name,
      password: hashedPassword,
      email: req.body.email,
      location: req.body.location
    });
    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

// Route to login a user
router.post("/loginuser", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password); // Compare hashed passwords
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    const token = jwt.sign({ email: user.email }, 'hardeep', { expiresIn: '1h' }); // Generate JWT token
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
