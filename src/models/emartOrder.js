const mongoose = require('mongoose');
const { Schema } = mongoose;


const orderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmartUser',
        required: true
    },
    product: [
        {
            title: String,
            category: String,
            price: Number,
            discountPrice: Number,
            sku: String,
            stock: String,
            quantity: Number,
            totalPrice: Number
        }
    ],
    status: {
        type: String,
        enum: ['pending', 'rejected', 'aproved'],
        default: 'pending'
    },
    tranId: {
        type: String,
        required: true,
        unique: true
    },
    totalPrice: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('EmartOrder', orderSchema);