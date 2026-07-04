require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const dbConnetion = require('./utils/dbConnection');

// middleware
app.use(express.json());
app.use(cors());

// Mongodb Connection
dbConnetion();

// Routes
app.use('/register', (req, res) => {
    res.send('hello');
})

// Port 
let port = process.env.PORT || 5000
app.listen(port, (req, res) => {
    console.log(`Server is running on port ${port}`);
});