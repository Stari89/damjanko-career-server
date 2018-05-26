const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const checkAdmin = require('../middleware/check-admin');
const logMessage = require('../middleware/log-message');
const ApplicationsController = require('../controllers/applications');

router.get('/user-application', checkAuth, logMessage, ApplicationsController.applications_get_user_assigned_application);
router.get('/', checkAuth, checkAdmin, logMessage, ApplicationsController.applications_get_all);
router.post('/', checkAuth, checkAdmin, logMessage, ApplicationsController.applications_create_application);
router.get('/:applicationId', checkAuth, checkAdmin, logMessage, ApplicationsController.applications_get_application);
router.patch('/:applicationId', checkAuth, checkAdmin, logMessage, ApplicationsController.applications_update_application);
router.delete('/:applicationId', checkAuth, checkAdmin, logMessage, ApplicationsController.applications_delete_application);

module.exports = router;