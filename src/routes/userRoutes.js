const express = require('express');
const router = express.Router();
const userController = require('./../controllers/userController');
const validate = require('../middleware/validationMiddleware');
const { registerSchema, loginSchema } = require('../validation/userValidation');

router.post('/register', validate(registerSchema), userController.register);
router.post('/login', validate(loginSchema), userController.login);
router.get('/profile', userController.getUserProfile);

module.exports = router;
