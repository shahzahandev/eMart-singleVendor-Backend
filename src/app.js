require('dotenv').config();
require('node:dns').setServers(['1.1.1.1', '8.8.8.8']);
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dbConnetion = require('./utils/dbConnection');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const paymentRoutes = require('./routes/paymentRoutes');

// middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Mongodb Connection
dbConnetion();

// Routes
app.use('/api/v1/auth', authRoutes); // Auth-Routes ===> checked
app.use('/api/v1/user', userRoutes);  // User-Routes ===> checked
app.use('/api/v1/product', productRoutes); // Product-Routes ===> checked
app.use('/api/v1/cart', cartRoutes);  // Cart-Routes ===> checked
app.use('/api/v1/payment', paymentRoutes);  // Payment-Routes ===> checked

// Port 
let port = process.env.PORT || 5000
app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);
});

// chmgxcnnanlamvlp // email password for app