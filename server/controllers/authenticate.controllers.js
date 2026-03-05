const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.model');
const User = require('../models/user.model');

const authAdmin = async (req,res, next) => {
    const token = req.headers.token;

    // If token not Found
    if(!token){res.json({success : false, message : "No token is found !"})}

    // Extracting the values from the token
    const data = jwt.verify(token,process.env.JWT_KEY);
    try {
        const admin = await Admin.findById(data.id);
        if(!admin){
            return res.json({success : false, message : "No admin Found !!"})
        }
        next()
    } catch (error) {
        res.json({success : false, message : error.message});
    }

}

const authUser = async (req,res,next) => {
    const token = req.headers.token;
    if(!token){res.json({success : false, message : "No token is found !"})}
    const data = jwt.verify(token,process.env.JWT_KEY);
    try {
        const user = await User.findById(data.id);
        if(!user){
            return res.json({success : false, message : "No user Found !!"})
        }
        next()
    } catch (error) {
        res.json({success : false, message : error.message});
    }
}

module.exports = {
    authAdmin,
    authUser,
}