const express = require('express');
const router = express.Router();
const {authAdmin, authUser} = require("../controllers/authenticate.controllers")

router.get('/admin',authAdmin,(req,res)=>{
    res.json({success : true , message : "You are logged-in"})
});

router.get('/user',authUser,(req,res)=>{
    res.json({success : true , message : "You are logged-in"})
});

module.exports = router;