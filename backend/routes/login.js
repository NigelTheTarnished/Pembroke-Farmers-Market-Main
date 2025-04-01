  const express = require('express');
  const jwt = require('jsonwebtoken');
  //const bcrypt = require('bcryptjs');
  const User = require('../models/User'); // User model
  const router = express.Router();

  router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        console.log("User not found");
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Compare provided password with the stored hashed password
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        console.log("Password mismatch");
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Generate JWT token
      const payload = {
        user: {
          id: user.id
        }
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token }); // Send the token to the client
    } catch (err) {
      console.error("Error:", err);
      res.status(500).json({ message: err.message });
    }
  });

  module.exports = router;
