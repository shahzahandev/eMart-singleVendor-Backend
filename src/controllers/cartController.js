const Product = require('../models/emartProduct');
const Cart = require('../models/emartCart');

exports.createCart = async(req, res) => {
    const {proid, userid} = req.body;

    try { 
        if(!proid || !userid){
            return res.status(400).json({
                success: false,
                message: 'Field is required'
            });
        }
        const existingProduct = await Product.findOne({_id : proid});
        
        console.log(product);

        if(!existingProduct){
            return res.status(404).json({
                success: false,
                message: 'Product Not found'
            });
        }

        let cart = new Cart ({
            product: proid,
            quantity: 1,
            user: userid,
            totalPrice: existingProduct.price
        });
        await cart.save();

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