const express = require('express');
const auth = require('../../middlewares/auth');
const { validate } = require('../../middlewares/validate');
const userValidation = require('../../validations/user.validation');
const { userController } = require('../../controllers');

const router = express.Router();
router.get('/:id', auth(), userController.getDetails);
router.get('/', auth(), userController.getAll);
router.post('/add', validate(userValidation.createUser), userController.createUser);
router.put('/:id', auth(), userController.updateUser);
router.delete('/:id', validate(userValidation.deleteUser), userController.deleteUser);
module.exports = router;