const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const userValidation = require('../validations/user.validation');
const validate = require('../middlewares/validate');

router.post('/login', validate(userValidation.login), authController.login.bind(authController));
router.post('/register', validate(userValidation.create), authController.register.bind(authController));

module.exports = router; 