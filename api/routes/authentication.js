const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const checkAdmin = require('../middleware/check-admin');

const AuthenticationController = require('../controllers/authentication');

const logMessage = require('../middleware/log-message');

router.get('/', checkAuth, logMessage, AuthenticationController.authentication_isAuthenticated);
router.post('/', logMessage, AuthenticationController.authentication_authenticate);
router.get('/is-admin', logMessage, checkAuth, checkAdmin, AuthenticationController.authentication_isAuthenticated);

module.exports = router;