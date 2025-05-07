const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const postValidation = require('../validations/post.validation');
const validate = require('../middlewares/validate');

router.get('/', postController.getAll.bind(postController));
router.get('/:id', postController.getById.bind(postController));
router.post('/', validate(postValidation.create), postController.create.bind(postController));
router.put('/:id', validate(postValidation.update), postController.update.bind(postController));
router.delete('/:id', postController.delete.bind(postController));

module.exports = router; 