// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const { createUser } = require('../controller/userController');

router.post('/users', createUser); // POST: /api/users

module.exports = router;
