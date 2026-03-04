const User = require('../models/user.model')

const fetchUser = async (req,res) => {
    try {
        console.log("The fetch User starts")
    //getting the user whoes mood is not equal to 0
    const user = await User.find({mood : {$ne : 0}});
    console.log("Users Found")
    res.json({success : true, userData : user})
    } catch (error) {
        res.json({success : false, message : error.message})
        console.log("The Error :",error);
    }
}

module.exports = {
    fetchUser
}