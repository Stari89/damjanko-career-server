const express = require('express');
const router = express.Router();

const UsersController = require('../controllers/users');

router.get('/', UsersController.users_get_all);
router.post('/', UsersController.users_create_user);
router.post('/signin', UsersController.users_signin);
router.get('/:userId', UsersController.users_get_user);
// router.patch('/:userId', UsersController.users_update_user);
router.delete('/:userId', UsersController.users_delete_user)


module.exports = router;