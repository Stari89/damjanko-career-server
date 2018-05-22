const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const checkAdmin = require('../middleware/check-admin');
const logMessage = require('../middleware/log-message');
const ApplicationsController = require('../controllers/applications');

module.exports = router;