const mongoose = require('mongoose');


let dbConnetion = () => {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            console.log('MongoDB connected successfully.')
        })
        .catch((error) => {
            console.log('MongoDB connection failed.', error.message)
        });
}

module.exports = dbConnetion