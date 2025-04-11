require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/login'); // Correct the import
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || 'mongodb://localhost/farmers_market', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api/auth', authRoutes);  // Use login routes here
app.use('/api/vendors', require('./routes/vendors'));  // Vendor routes should be protected with JWT

// Protected Routes (requires JWT token)
// app.use('/api/vendors', require('./middleware/auth'), require('./routes/vendors')); // Apply auth to vendor routes that need protection
app.use('/api/vendors', require('./routes/vendors'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
