const express = require('express');
const router = express.Router();
const { createUser } = require('../controllers/users.controllers');

router.post('/', createUser);

module.exports = router;
