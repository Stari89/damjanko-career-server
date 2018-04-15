const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');

const UsersController = require('../controllers/users');

router.get('/', checkAuth, UsersController.users_get_all);
router.post('/', checkAuth, UsersController.users_create_user);
router.post('/signin', UsersController.users_signin);
router.get('/:userId', checkAuth, UsersController.users_get_user);
// router.patch('/:userId', UsersController.users_update_user);
router.delete('/:userId', checkAuth, UsersController.users_delete_user)


module.exports = router;