const Admin = require('../models/admin.model');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const LoginAdmin = async (req,res) => {
    try{
        const {email, password} = req.body;

        const admin = await Admin.find({email});

        //checking if the admin exists
        if(admin.length > 0){
            //checking the password
            //password is incorrect
            if(!bcrypt.compareSync(password, admin[0].password)){
                return res.json({success : false, message : "Invalid password"});
            }
            //password is correct
            else{
                const token = jwt.sign({id : admin[0]._id, email : admin[0].email}, process.env.JWT_KEY);
                return res.json({success : true, message : "Login successful", admin : admin[0], token : token});
            }
        }
        //admin does not exist in the database
        else{
            return res.json({success : false , message : "Admin does not exist"});
        }
    }catch(err){
        console.log(err);
        return res.json({success : false, message : err.message});
    }
}

const LoginUser = async (req,res) => {
    try{
        const {email, password} = req.body;

        const user = await User.find({email});

        //checking if the admin exists
        if(user.length > 0){
            //checking the password
            //password is incorrect
            if(!bcrypt.compareSync(password, admin[0].password)){
                return res.json({success : false, message : "Invalid password"});
            }
            //password is correct
            else{
                const token = jwt.sign({id : user[0]._id, email : user[0].email}, process.env.JWT_KEY);
                return res.json({success : true, message : "Login successful", user : user[0], token : token});
            }
        }
        //user does not exist in the database
        else{
            return res.json({success : false , message : "user does not exist"});
        }
    }catch(err){
        console.log(err);
        return res.json({success : false, message : err.message});
    }
}

const SignUpAdmin = async (req,res) => {
    try{
        const {name,email, password} = req.body;

        const hashPass = bcrypt.hashSync(password, 10);
        //making new admin object
        const admin = {
            name : name,
            email : email,
            password : hashPass
        }

        try {
            //uploading the admin to the database
            const newAdmin = await Admin.create(admin);
            return res.json({success : true, message : "User created successfully", admin : newAdmin});
        } catch (error) {
            console.log(err);
        return res.json({success : false, message : error.message});
        }
    }catch(err){
        console.log(err);
        return res.json({success : false, message : err.message});
    }
}

const SignUpUser = async (req,res) => {
    try{
        const {name,email, password} = req.body;

        const hashPass = bcrypt.hashSync(password, 10);

        //making new user object
        const user = {
            name : name,
            email : email,
            password : hashPass
        }

        try {
            //uploading the user to the database
            const newUser = await User.create(user);
            return res.json({success : true, message : "User created successfully", user : newUser});
        } catch (error) {
            console.log(err);
        return res.json({success : false, message : error.message});
        }
    }catch(err){
        console.log(err);
        return res.json({success : false, message : err.message});
    }
}

module.exports = {
    LoginAdmin,
    LoginUser,
    SignUpAdmin,
    SignUpUser,
}