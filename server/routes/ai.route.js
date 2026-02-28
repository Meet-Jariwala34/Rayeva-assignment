const express =  require('express');
const router = express.Router();
const {main, dataInsert} = require('../controllers/ai.controllers');

router.post("/generate", main);
router.post("/insert", dataInsert);

module.exports = router ; 
