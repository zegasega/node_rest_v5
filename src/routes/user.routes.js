const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const userValidation = require('../validations/user.validation');
const validate = require('../middlewares/validate');

router.get('/', userController.getAll.bind(userController));
router.get('/:id', userController.getById.bind(userController));
router.post('/', validate(userValidation.create), userController.create.bind(userController));
router.put('/:id', validate(userValidation.update), userController.update.bind(userController));
router.delete('/:id', userController.delete.bind(userController));

module.exports = router; 