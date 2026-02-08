
const express = require('express');
const authController = require('../controllers/auth.controller');
const validate = require('../middleware/validation');
const { signUpSchema, signInSchema } = require('../validators/user.schema');

const router = express.Router();

router.post('/signup', validate(signUpSchema), authController.signup);
router.post('/signin', validate(signInSchema), authController.signin);
router.get('/verify/:token', authController.verifyEmail);

module.exports = router;
