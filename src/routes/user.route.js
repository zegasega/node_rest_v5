const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const userValidation = require('../validations/user.validation');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.post('/register', validate(userValidation.createUser), userController.createUser);
router.post('/login', validate(userValidation.login), userController.login);
router.get('/me', auth(), userController.getMe);
router.patch('/:userId', auth(), validate(userValidation.updateUser), userController.updateUser);
router.delete('/:userId', auth(), validate(userValidation.deleteUser), userController.deleteUser);

module.exports = router; 