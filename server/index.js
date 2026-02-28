const express = require('express');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;
const connectDB = require('./config/db');
const loginRoute = require('./routes/login.route');
const cors = require('cors');
const aiRoute = require('./routes/ai.route');


//middleware
app.use(express.json());
app.use(cors());

// Connect to the database

connectDB();

app.listen(PORT , () => {
    console.log(`Server is running on the port ${PORT}`)
})

//routes
app.use("/api", loginRoute);
app.use("/ai",aiRoute);

