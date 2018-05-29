const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const checkAdmin = require('../middleware/check-admin');
const logMessage = require('../middleware/log-message');
const ClientLogsController = require('../controllers/client-logs');

router.get('/', checkAuth, checkAdmin, logMessage, ClientLogsController.client_logs_get_all);
router.get('/:ip', checkAuth, checkAdmin, logMessage, ClientLogsController.client_logs_get_by_ip);
router.post('/', logMessage, ClientLogsController.client_logs_create_client_log);
router.delete('/', checkAuth, checkAdmin, logMessage, ClientLogsController.client_logs_delete_all);

module.exports = router;