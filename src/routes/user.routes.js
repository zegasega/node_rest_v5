const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const userValidation = require('../validations/user.validation');
const validate = require('../middlewares/validate');
const authMiddleware = require('../middlewares/auth.middleware');

// Public routes
router.get('/', userController.getAll.bind(userController));
router.get('/search', userController.searchUsers.bind(userController));
router.get('/:id/posts', userController.getUserPosts.bind(userController));

// Protected routes
router.get('/profile', authMiddleware, userController.getProfile.bind(userController));
router.put('/profile', authMiddleware, validate(userValidation.update), userController.updateProfile.bind(userController));
router.delete('/profile', authMiddleware, userController.deleteProfile.bind(userController));

module.exports = router; 