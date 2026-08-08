const Product = require('../models/emartProduct');
const mongoose = require('mongoose');


exports.createProduct = async (req, res) => {
    let { title, price, category, stock, tag, discountType, discountPrice, discountStartDate, discountEndDate, isMain } = req.body;

    try {


        if (!title || !price || !category || !stock) {
            return res.status(400).json({
                success: false,
                message: 'Title, Price, stock & Category are required.'
            });
        }


        if (stock < 0) {
            return res.status(400).json({
                success: false,
                message: 'Stock must be greater then 1'
            })
        }

        price = Number(price);
        discountPrice = Number(discountPrice);

        if (discountType === "flat") {
            if (discountPrice >= price) {
                return res.status(400).json({
                    success: false,
                    message: "Discount amount cannot be greater than or equal to product price."
                });
            }

            if (discountPrice < 0) {
                return res.status(400).json({
                    success: false,
                    message: "Discount amount cannot be negative."
                });
            }
        }

        // if (discountType == "percentage") {
        //     if (discountPrice > 100 || discountPrice < 0) {
        //         return res.status(400).json({
        //             success: false,
        //             message: "Percentage discount must be between 0 and 100."
        //         });
        //     }
        // }

        let startDate = new Date(discountStartDate).setHours(0, 0, 0, 0)
        let endDate = new Date(discountEndDate).setHours(0, 0, 0, 0)
        let currentDate = new Date().setHours(0, 0, 0, 0)

        if (currentDate > startDate) {
            return res.status(400).json({
                success: false,
                message: `Discount start date can't smaller then today date`
            })
        }

        if (endDate < startDate) {
            return res.status(400).json({
                success: false,
                message: `Discount end date can't smaller then current date`
            })
        }

        let images = [];

        req.files.map((item, index) => {
            images.push({
                url: `/upload/${item.filename}`,
                isMain: isMain == index
            });
        })

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
            images: images,
            tag: tag.split('.'),
            sku: sku
        });

        await product.save();

        return res.status(201).json({
            success: true,
            message: 'Product Created successfully',
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

exports.allProduct = async (req, res) => {
    try {
        const products = await Product.find({})
            .sort({ createdAt: -1 })

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

exports.allActiveProduct = async (req, res) => {
    try {
        const products = await Product.find({ status: 'active' })
            .sort({ createdAt: -1 })

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

exports.allActiveAndDiscountProduct = async (req, res) => {
    try {
        const currentDate = new Date();
        const products = await Product.find({
            $and: [
                { status: "active" },
                { discountStartDate: { $lte: currentDate } },
                { discountEndDate: { $gte: currentDate } }
            ]
        }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: 'Fetching active and dicount products successfully',
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

exports.deleteProduct = async (req, res) => {
    const { id } = req.params;

    try {
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'ID is required.'
            });
        }

        const product = await Product.findByIdAndUpdate({ _id: id }, { status: 'inactive' });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: 'Product Not Found.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Product Deleted successfully.',
            product
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

    try {
        if (!id) {
            return res.status(400).json({
                success: false,
                message: 'ID is required'
            });
        }

        const product = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

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

exports.getSearchData = async (req, res) => {
    try {
        let productData = await Product.find({
            title: { $regex: req.body.title, $options: "i" }
        });
        return res.status(200).json({
            success: true,
            message: "fecthing product successfully",
            productData
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