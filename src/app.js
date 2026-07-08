require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');

const dbConnetion = require('./utils/dbConnection');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

// middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Mongodb Connection
dbConnetion();

// Routes
app.use('/api/v1/auth', authRoutes); // Auth-Routes
app.use('/api/v1/user', userRoutes);  // User-Routes



// Port 
let port = process.env.PORT || 5000
app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);
});

// chmgxcnnanlamvlp // email password for app