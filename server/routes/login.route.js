const express = require('express');
const router = express.Router();
const {LoginAdmin, LoginUser, SignUpAdmin, SignUpUser} = require('../controllers/login.controllers');

router.post("/login/admin", LoginAdmin);
router.post("/login/user", LoginUser);
router.post("/signup/user", SignUpUser);

// Admins can only be created by other admins, so there is no route for creating an admin
// I used this route to create some demo admins .
// router.post("/signup/admin", SignUpAdmin);

module.exports = router;