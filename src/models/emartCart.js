const mongoose = require('mongoose');
const {Schema} = mongoose;

const cartSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmartProduct',
        required: true
    },
    quantity: {
        type: Number,
        min: 1,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmartUser',
        required: true
    },
    totalPrice: {
        type: Number
    }
});

module.exports = mongoose.model('EmartCart', cartSchema);