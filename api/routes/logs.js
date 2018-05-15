const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const checkAdmin = require('../middleware/check-admin');
const logMessage = require('../middleware/log-message');
const LogsController = require('../controllers/logs');

router.get('/', checkAuth, checkAdmin, logMessage, LogsController.logs_get_all);
router.get('/:userId', checkAuth, checkAdmin, logMessage, LogsController.logs_get_by_user);
router.delete('/', checkAuth, checkAdmin, logMessage, LogsController.logs_delete_all);

module.exports = router;