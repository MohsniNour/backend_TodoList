const express = require('express');
const userRoute = require('./user.route');
const todoRoute = require('./todo.route');

// const { deleteAll } = require('../../services');

const router = express.Router();

router.use('/users', userRoute);
router.use('/Todo', todoRoute);

module.exports = router;
