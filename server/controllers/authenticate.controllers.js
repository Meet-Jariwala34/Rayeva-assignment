const jwt = require('jsonwebtoken');
const Admin = require('../models/admin.model');
const User = require('../models/user.model');

const authAdmin = async (req,res, next) => {
    const token = req.headers.token;

    if(!token){res.json({success : false, message : "No token is found !"})}

    const data = jwt.verify(token,process.env.JWT_KEY);

    const admin = await Admin.findById(data.id);

    if(!admin){
        return res.json({success : false, message : "No admin Found !!"})
    }

    next()

}

const authUser = async (req,res,next) => {
    const token = req.headers.token;

    if(!token){res.json({success : false, message : "No token is found !"})}

    const data = jwt.verify(token,process.env.JWT_KEY);

    const user = await User.findById(data.id);

    if(!user){
        return res.json({success : false, message : "No user Found !!"})
    }

    next()
}

module.exports = {
    authAdmin,
    authUser,
}