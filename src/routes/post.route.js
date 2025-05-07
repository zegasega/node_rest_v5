const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const postValidation = require('../validations/post.validation');
const postController = require('../controllers/post.controller');

const router = express.Router();

router.post('/', auth(), validate(postValidation.createPost), postController.createPost);
router.get('/', postController.getPosts);
router.get('/:postId', validate(postValidation.getPost), postController.getPost);
router.patch('/:postId', auth(), validate(postValidation.updatePost), postController.updatePost);
router.delete('/:postId', auth(), validate(postValidation.deletePost), postController.deletePost);

module.exports = router; 