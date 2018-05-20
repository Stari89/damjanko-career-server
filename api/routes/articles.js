const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const checkAdmin = require('../middleware/check-admin');
const logMessage = require('../middleware/log-message');
const ArticlesController = require('../controllers/articles');

router.get('/', checkAuth, checkAdmin, logMessage, ArticlesController.articles_get_all);
router.post('/', checkAuth, checkAdmin, logMessage, ArticlesController.articles_create_article);
router.get('/:articleId', checkAuth, checkAdmin, logMessage, ArticlesController.articles_get_article);
router.patch('/:articleId', checkAuth, checkAdmin, logMessage, ArticlesController.articles_update_article);
router.delete('/:articleId', checkAuth, checkAdmin, logMessage, ArticlesController.articles_delete_article);

module.exports = router;