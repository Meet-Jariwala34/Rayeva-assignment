const express = require('express');
const router = express.Router();
const {conversation} = require('../controllers/chat.controllers');

router.post("/chats",conversation);

module.exports = router