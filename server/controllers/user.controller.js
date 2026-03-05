const User = require('../models/user.model')

const fetchUser = async (req,res) => {
    try {
    //getting the user whoes mood is not equal to 0
    const user = await User.find({mood : {$ne : 0}});
    res.json({success : true, userData : user})
    } catch (error) {
        res.json({success : false, message : error.message})
    }
}

module.exports = {
    fetchUser
}