const SSLCommerzPayment = require('sslcommerz-lts');
const Cart = require('../models/emartCart');
const Order = require('../models/emartOrder');

const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = false //true for live, false for sandbox


exports.paymentController = async (req, res) => {
    const { userId, cus_name, cus_email, cus_add1, cus_add2, cus_city, cus_state, cus_phone, cus_postcode, cus_fax } = req.body;

    // Create Random trantion id
    let firstThreeletter = cus_name.slice(0, 2)
    let randomNumber = Date.now().toString()
    let randomNumber2 = Date.now().toString();
    let ecoName = 'Eco';
    let tran_id = firstThreeletter + randomNumber.slice(-5) + ecoName + randomNumber2.slice(-3);

    try {
        const cart = await Cart.find({ user: userId }).populate('product user');

        let totalPrice = 0;
        let proInfo = [];

        cart.map(item => {
            proInfo.push({
                title: item.product.title,
                category: item.product.category,
                price: item.product.price,
                discountPrice: item.product.discountPrice,
                sku: item.product.sku,
                stock: item.product.stock,
                quantity: item.quantity,
                totalPrice: item.totalPrice
            });

            user = item.user
            totalPrice += item.totalPrice
        });

        const data = {
            total_amount: totalPrice,
            currency: 'BDT',
            tran_id: tran_id, // use unique tran_id for each api call
            success_url: 'http://localhost:3030/success',
            fail_url: 'http://localhost:3030/fail',
            cancel_url: 'http://localhost:3030/cancel',
            ipn_url: 'http://localhost:3030/ipn',
            shipping_method: 'Courier',
            ship_country: 'Bangladesh',
            ship_name: cus_name,
            ship_add1: cus_add1,
            ship_add2: cus_add2,
            ship_city: cus_city,
            ship_state: cus_state,
            ship_postcode: cus_postcode,
            ...req.body
        };

        // Order saving process
        let order = new Order({
            user: userId,
            product: proInfo,
            tranId: tran_id,
            totalPrice: totalPrice
        });
        await order.save();

        const sslcz = new SSLCommerzPayment(store_id, store_passwd, is_live)
        sslcz.init(data).then(apiResponse => {
            // Redirect the user to payment gateway   
            let GatewayPageURL = apiResponse.GatewayPageURL

            return res.status(201).json({
                success: true,
                message: 'Order created successfully, Make payment in this URL',
                payment_link: GatewayPageURL
            });
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

exports.singleOrder = async (req, res) => {
    const { userId } = req.params;

    try {
        const order = await Order.find({ user: userId });
        if (!order) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Fetching order successfully',
            order
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

exports.allOrder = async (req, res) => {
    try {
        const order = await Order.find({});
        return res.status(200).json({
            success: true,
            message: 'Fetching all order successfully',
            order
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