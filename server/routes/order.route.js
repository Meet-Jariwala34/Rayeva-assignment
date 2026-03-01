const express = require('express')
const router = express.Router();
const {addOrder} = require('../controllers/order.controller');

router.post("/addOrder", addOrder);

module.exports = router;
