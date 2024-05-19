// server/routes/vendorRoutes.js

const express = require('express');
const router = express.Router();
const vendorController = require('../controllers/vendorController');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const path = require('path');
var uploader = multer({
    storage: multer.diskStorage({}),
    limits: { fileSize: 500000 }
});

// Middleware for handling file uploads with Multer
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });

// Create new vendor with file uploads
router.post('/create', uploader.fields([
  { name: 'panCard', maxCount: 1 },
  { name: 'aadharCard', maxCount: 1 },
  { name: 'businessDoc', maxCount: 1 }
]), vendorController.createVendor);


// Get all vendors
router.get('/', vendorController.getAllVendors);

// Get vendor by ID
router.get('/:id', vendorController.getVendorById);

// DELETE VENDOR BY ID

router.delete('/:id', vendorController.deleteVendorById);

// UPDATE VENDOR BY ID
router.put('/update/:id', uploader.fields([
  { name: 'panCard', maxCount: 1 },
  { name: 'aadharCard', maxCount: 1 },
  { name: 'businessDoc', maxCount: 1 }
]), vendorController.updateVendor);




module.exports = router;
