const express = require('express');
const router = express.Router();

const UserController = require('../controllers/users');

router.post('/signin', UserController.users_signin);

module.exports = router;