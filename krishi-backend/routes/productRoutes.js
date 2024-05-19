//product routs

const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const path = require('path');
var uploader = multer({
    storage: multer.diskStorage({}),
    limits: { fileSize: 500000 }
});

// Middleware for handling file uploads with Multer
 //const storage = multer.memoryStorage();
 //const upload = multer({ storage: storage });

// Create new product with file uploads

router.post('/add-product', uploader.fields([
    { name: 'image', maxCount: 1 }
  ]), productController.addProduct);

// get all products

router.get('/', productController.getAllProducts);

// get product by id

router.get('/:id', productController.getProductById);

// update product by id

router.put('/update/:id', uploader.fields([
    { name: 'image', maxCount: 1 }
  ]), productController.updateProductById);

// delete product by id

router.delete('/delete/:id', productController.deleteProductById);

module.exports = router
