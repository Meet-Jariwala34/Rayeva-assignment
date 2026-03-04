const express = require('express');
const router = express.Router();
const {fetchUser} = require('../controllers/user.controller');

router.get("/fetchUser",fetchUser);

module.exports = router ; 