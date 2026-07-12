const Product = require('../models/emartProduct');
const mongoose = require('mongoose');


exports.createProduct = async (req, res) => {
    const { title, price, category, stock } = req.body;

    try {
        if (!title || !price || !category || !stock) {
            return res.status(400).json({
                success: false,
                message: 'Title, Price, stock & Category are required.'
            });
        }

        const existingProduct = await Product.findOne({ title });

        if (existingProduct) {
            return res.status(400).json({
                success: false,
                message: 'This title is already taken, Please chooce anthor one.'
            });
        }

        let ranNum = `${Date.now() * Math.random()}`;
        let sku = ranNum.slice(0, 7);

        const product = new Product({
            ...req.body,
            sku: sku
        });

        await product.save();

        return res.status(201).json({
            success: true,
            message: 'Product Created successfully',
            product: {
                title: product.title,
                status: product.status
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}

exports.allProduct = async(req, res) => {
    try {
        const products = await Product.find({})
        .limit(10)
        .sort({createdAt: -1})

        return res.status(200).json({
            success: true,
            message: 'Fetching all products successfully',
            products
        });

    } catch (error) {
           console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        }); 
    }
}

exports.singleProduct = async (req, res) => {
    let { id } = req.params;

    try {
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'ID is required'
            });
        }

        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product Not Found.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Product fatching successfully',
            product: {
                title: product.title,
                price: product.price
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'ID is required.'
            });
        }

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product Not Found.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Product Deleted successfully.'
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}

exports.updateProduct = async (req, res) => {
    const { id } = req.params;
    const { title, price, category } = req.body;

    try {
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'ID is required'
            });
        }

        const product = await Product.findByIdAndUpdate(id, { title, price, category }, { new: true, runValidators: true });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product Not Found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            product
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
}