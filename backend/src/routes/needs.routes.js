const express = require('express');
const router = express.Router();
const { createNeed, listNeeds } = require('../controllers/needs.controller');
const auth = require('../middlewares/auth.middleware');

router.post('/', auth.optional, createNeed); 
router.get('/', auth.optional, listNeeds);

module.exports = router;