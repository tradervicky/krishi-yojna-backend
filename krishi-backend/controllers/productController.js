const Product = require('../models/Product') // Change constant name to uppercase "Product"
const Upload = require('../helpers/upload')

const addProduct = async (req, res) => {
    try {
        const {
            title,
            vendor,
            price,
            category,
            subCategory,
            quantity,
            description,
        } = req.body;

        const imageFile = await Upload.uploadFile(req.files["image"][0].path);

        const newProduct = new Product({ // Use uppercase "Product" for model instantiation
            title,
            vendor,
            price,
            category,
            subCategory,
            quantity,
            description,
            image: imageFile.secure_url
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find(); // Use uppercase "Product" for database query
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id); // Use uppercase "Product" for database query
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}


const deleteProductById = async (req, res)=>{
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const updateProductById = async (req, res)=>{
    try {
        const {
            title,
            vendor,
            price,
            category,
            subCategory,
            quantity,
            description,
        } = req.body;

        const productId = req.params.id;

        // Retrieve the existing product
        const existingProduct = await Product.findById(productId);


        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Delete the existing image from Cloudinary if it exists
        if (existingProduct.image) {
            const imagePublicId = existingProduct.image.split('/').pop().split('.')[0]; // Extract public_id from URL
            await Upload.deleteFile(imagePublicId);
        }

        // Upload the new image to Cloudinary


        const imageFile = await Upload.uploadFile(req.files["image"][0].path);

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                title,
                vendor,
                price,
                category,
                subCategory,
                quantity,
                description,
                image: imageFile.secure_url,
            },
            { new: true } 
        );

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    addProduct,
    getAllProducts,
    getProductById,
    deleteProductById,
    updateProductById
}
