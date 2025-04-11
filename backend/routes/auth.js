const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config');

// Login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // For testing, accept any email/password
    // In production, you would validate against database
    const user = {
      id: '1',
      email: email,
      role: 'admin' // or 'vendor' based on your needs
    };

    const payload = {
      user: {
        _id: user.id,
        email: user.email,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      config.jwtSecret,
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
