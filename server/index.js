const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;
const connectDB = require('./config/db');

// Connect to the database
connectDB();

app.listen(PORT , () => {
    console.log(`Server is running on the port ${PORT}`)
})
