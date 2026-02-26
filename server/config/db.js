const mongoose = require('mongoose');

const connectDB = async () =>{

    await mongoose.connect(process.env.MONGO_URI);

    console.log("The Database is connected successfully");
}

module.exports = connectDB;