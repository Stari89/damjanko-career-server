const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const AuthenticationController = require('../controllers/authentication');

router.get('/', checkAuth, AuthenticationController.authentication_isAuthenticated);
router.post('/', AuthenticationController.authentication_authenticate);

module.exports = router;