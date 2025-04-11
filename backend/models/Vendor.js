const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
  name: String,
  type: {
    type: String,
  },

  password: {
    type: String,
    required: true
  },
  
  status: {
    type: Number,
    enum: [0, 1, 2, 3],
    default: 2 
  },
  
  email: {
    type: String,
    required: true,
    unique: true
  },
  phone: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Vendor', vendorSchema); 