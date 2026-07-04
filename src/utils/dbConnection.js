const mongoose = require('mongoose');


let dbConnetion = () => {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            console.log('MongoDB connected successfully.')
        })
        .catch(() => {
            console.log('MongoDB connection failed.')
        });
}

module.exports = dbConnetion