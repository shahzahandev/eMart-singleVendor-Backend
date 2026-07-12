const Product = require('../models/emartProduct');
const Cart = require('../models/emartCart');
const emartProduct = require('../models/emartProduct');

exports.createCart = async (req, res) => {
    const { proid, userid } = req.body;

    try {
        if (!proid || !userid) {
            return res.status(400).json({
                success: false,
                message: 'Field is required'
            });
        }

        const existingProduct = await Product.findOne({ _id: proid });

        if (!existingProduct) {
            return res.status(404).json({
                success: false,
                message: 'Product Not found'
            });
        }

        if (existingProduct.stock <= 0) {
            return res.status(400).json({
                success: false,
                message: "Product is out of stock."
            });
        }

        // same user and product access
        const existingProductOnCart = await Cart.findOne({ product: proid, user: userid });

        if (existingProductOnCart) {
            existingProductOnCart.quantity += 1
            finalPrice = existingProduct.discountPrice > 0 ? existingProduct.discountPrice : existingProduct.price
            existingProductOnCart.totalPrice = existingProductOnCart.quantity * finalPrice
            existingProductOnCart.save();

            // stock check
            if (existingProduct.stock <= 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Product is out of stock'
                });
            }

            existingProduct.stock = existingProduct.stock - 1
            existingProduct.save();

            return res.status(200).json({
                success: true,
                message: 'Product quantity updated successfully',
                existingProductOnCart,
            });
        }

        let priceCal = existingProduct.discountPrice > 0 ? existingProduct.discountPrice : existingProduct.price
        
        let cart = new Cart({
            user: userid,
            product: proid,
            quantity: 1,
            totalPrice: priceCal
        });
        await cart.save();
        existingProduct.stock = existingProduct.stock - 1
        existingProduct.save();


        return res.status(201).json({
            success: true,
            message: 'Cart created successfully',
            cart
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Server Error.',
            error: error.message
        });
    }
}

exports.increDecre = async (req, res) => {
    const { id } = req.params;
    const { type, userid } = req.body;

    try {
        const cart = await Cart.findOne({ _id: id });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart Not Found'
            });
        }

        // access product on cart
        const product = await Product.findById(cart.product);

          if (product.stock <= 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Product is out of stock.'
                })
            }
        
        // increment and decrement process
        if (type == 'plus') {
            cart.quantity += 1;
            product.stock = product.stock - 1
            await product.save();

        } else if (type == 'minus') {
            if (cart.quantity <= 1) {
                return res.status(400).json({
                    success: false,
                    message: 'Quantity cannot be less than 1'
                });
            }
            cart.quantity -= 1;
            product.stock = product.stock + 1
            await product.save();

        } else {
            return res.status(400).json({
                success: false,
                message: 'Invalid type. Use plus or minus'
            });
        }
        // total price update
        let withSumDis = product.discountPrice ? product.discountPrice : product.price
        cart.totalPrice = cart.quantity * withSumDis
        await cart.save();        

        return res.status(200).json({
            success: true,
            message: 'cart item updated.',
            cart
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Server Error.',
            error: error.message
        });
    }
}

exports.deletecart = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Cart.findByIdAndDelete(id);

        if (!product) {
            return res.status(400).json({
                success: false,
                message: 'Card Not Found.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Cart deleted successfully.'
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Server Error.',
            error: error.message
        });
    }
}

exports.singleUserCart = async (req, res) => {
    const { userid } = req.params;

    try {
        let cart = await Cart.find({ user: userid }).populate('product');

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: 'Cart Not Found.'
            });
        }
        
        totalPrice = 0
        cart.map(item => {
            totalPrice += item.totalPrice
        })

        return res.status(200).json({
            success: true,
            message: 'Fetching your cart.',
            cart,
            totalPrice
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Server Error.',
            error: error.message
        });
    }
}

exports.allCart = async (req, res) => {
    try {
        const cart = await Cart.find({}).populate('user product');

        return res.status(200).json({
            success: true,
            message: 'Fetching all cart',
            cart
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Server Error.',
            error: error.message
        });
    }
}