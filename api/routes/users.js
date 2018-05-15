const express = require('express');
const router = express.Router();

const multer = require('multer');
const storage = multer.diskStorage({
	destination: function(req, file, cb) {
		cb(null, './uploads/');
	},
	filename: function(req, file, cb) {
		cb(null, new Date().getTime() + file.originalname);
	}
});
const fileFilter = (req, file, cb) => {
	if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
		cb(null, true);
	} else {
		// reject a file
		cb(null, false);
	}
};
const upload = multer({ 
	storage: storage,
	limits: {
		fileSize: 1024 * 1024 * 5 /* 5MB */
	},
	fileFilter: fileFilter
});

const checkAuth = require('../middleware/check-auth');
const checkAdmin = require('../middleware/check-admin');
const logMessage = require('../middleware/log-message');
const UsersController = require('../controllers/users');

router.get('/', checkAuth, checkAdmin, logMessage, UsersController.users_get_all);
router.post('/', checkAuth, checkAdmin, logMessage, UsersController.users_create_user);
router.get('/:userId', checkAuth, checkAdmin, logMessage, UsersController.users_get_user);
router.patch('/:userId', checkAuth, checkAdmin, logMessage, UsersController.users_update_user);
router.put('/:userId', checkAuth, checkAdmin, logMessage, upload.single('userImage'), UsersController.users_update_user_image);
router.delete('/:userId', checkAuth, checkAdmin, logMessage, UsersController.users_delete_user);


module.exports = router;