const express = require('express');
const router = express.Router();
const Vendor = require('../models/Vendor');
const auth = require('../middleware/auth');

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
router.post('/', auth, async (req, res) => {
  const vendor = new Vendor({
    name: req.body.name,
    type: req.body.type,
    status: req.body.status,
    email: req.body.email,
    phone: req.body.phone
  });

  try {
    const newVendor = await vendor.save();
    res.status(201).json(newVendor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a vendor
router.put('/:id', auth, async (req, res) => {
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
router.delete('/:id', auth, async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) return res.status(404).json({ message: 'Vendor not found' });

    await vendor.remove();
    res.json({ message: 'Vendor deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router; 