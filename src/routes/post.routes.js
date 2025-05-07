const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const postValidation = require('../validations/post.validation');
const validate = require('../middlewares/validate');
const authMiddleware = require('../middlewares/auth.middleware');

// Public routes
router.get('/', postController.getAll.bind(postController));
router.get('/search', postController.searchPosts.bind(postController));
router.get('/:id', postController.getById.bind(postController));

// Protected routes
router.post('/', authMiddleware, validate(postValidation.create), postController.create.bind(postController));
router.put('/:id', authMiddleware, validate(postValidation.update), postController.update.bind(postController));
router.delete('/:id', authMiddleware, postController.delete.bind(postController));
router.get('/my/posts', authMiddleware, postController.getMyPosts.bind(postController));

module.exports = router; 