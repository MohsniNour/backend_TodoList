const express = require('express');
const todoRoute = require('./todo.route');
const userRoute = require('./user.route');
const authRoute = require('./auth.route');

// const { deleteAll } = require('../../services');

const router = express.Router();

router.use('/todo', todoRoute);
router.use('/users', userRoute);
router.use('/auth', authRoute);

// route for developer delete all database
// router.delete('/delete-all', deleteAll.deleteAll);

module.exports = router;
