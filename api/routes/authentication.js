const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const checkAdmin = require('../middleware/check-admin');

const AuthenticationController = require('../controllers/authentication');

router.get('/', checkAuth, AuthenticationController.authentication_isAuthenticated);
router.post('/', AuthenticationController.authentication_authenticate);
router.get('/is-admin', checkAuth, checkAdmin, AuthenticationController.authentication_isAuthenticated);

module.exports = router;