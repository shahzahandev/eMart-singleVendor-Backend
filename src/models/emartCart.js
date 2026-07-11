const mongoose = require('mongoose');
const {Schema} = mongoose;

const cartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'EmartUser',
        required: true
    },
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
    totalPrice: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('EmartCart', cartSchema);