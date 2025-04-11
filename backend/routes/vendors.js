const express = require('express');
const router = express.Router();
const Vendor = require('../models/Vendor');
const auth = require('../middleware/auth');
const mongoose = require('mongoose');

// All routes should be protected
router.use(auth);

// Get all vendors
router.get('/', async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a vendor
router.post('/register', async (req, res) => {
  console.log("Register please", req.body);

  const { name, email, password } = req.body;
  const vendor = new Vendor({name, email, password});
  try {
    const newVendor = await vendor.save();
    res.status(201).json(newVendor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a vendor
router.put('/:id', async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });

    Object.assign(vendor, req.body);
    const updatedVendor = await vendor.save();
    res.json(updatedVendor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a vendor
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  console.log(' DELETE request received for ID:', id);
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.log(' Invalid ObjectId');
    return res.status(400).json({ message: 'Invalid vendor ID' });
  }
  
  try {
    const vendor = await Vendor.findById(id);
  
    if (!vendor) {
      console.log('Vendor not found');
      return res.status(404).json({ message: 'Vendor not found' });
    }
  
    await vendor.deleteOne();
    console.log('Vendor deleted successfully');
    return res.json({ message: 'Vendor deleted successfully' });
  
  } catch (err) {
    console.error(' Error during delete:', err.message);
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router; 