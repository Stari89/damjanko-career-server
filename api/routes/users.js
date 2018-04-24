const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const checkAdmin = require('../middleware/check-admin');

const UsersController = require('../controllers/users');

router.get('/', checkAuth, checkAdmin, UsersController.users_get_all);
router.post('/', checkAuth, checkAdmin, UsersController.users_create_user);
router.get('/:userId', checkAuth, checkAdmin, UsersController.users_get_user);
router.patch('/:userId', checkAuth, checkAdmin, UsersController.users_update_user);
router.delete('/:userId', checkAuth, checkAdmin, UsersController.users_delete_user);


module.exports = router;