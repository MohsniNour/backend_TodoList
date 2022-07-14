const express = require('express');
const { validate } = require('../middlewares/validate');
// const auth = require('../../middlewares/auth');
const authValidation = require('../validations/auth.validation');
const authController = require('../controllers/auth.controller');
// const { createAccountLimiter, requestVerifEmailLimiter } = require('../../middlewares/limiter');

const router = express.Router();

router.post('/login', validate(authValidation.login), authController.login);
router.post('/logout', validate(authValidation.logout), authController.logout);
router.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword);
router.post('/reset-password', validate(authValidation.resetPassword), authController.resetPassword);
// router.get('/requestVerifEmail', requestVerifEmailLimiter, auth(), authController.requestVerifEmail);

// router.get(
//   '/verifemail/:token/:redirectUrl',
//   //   requestVerifEmailLimiter,
//   validate(authValidation.verifyEmail),
//   authController.verifemail
// );
router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);

module.exports = router;
