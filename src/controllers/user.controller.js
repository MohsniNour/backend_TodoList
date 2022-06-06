const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { errors } = require('../utils/errors.constant');
const { userService } = require('../services');
const { userNameCin } = require('../utils/searchPatterns');

const addUser = catchAsync(async (req, res) => {
  try {
    const user = await userService.createUser({ ...req.body, role: roles[3] });
    res.status(httpStatus.CREATED).send(user);
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      error,
    });
  }
});
const userDetails= catchAsync(async (req, res) => {
  try {
    const user = await userService.getUserById(req.user._id);
    res.status(httpStatus.OK).send(user);
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      error,
    });
  }
});

const getUsers = catchAsync(async (req, res) => {
  try {
    const filter = pick(req.query, ['search', 'role']);
    const { search, role } = filter;
    const options = pick(req.query, ['sortBy', 'limit', 'page']);
    const result = await userService.queryUsers(
      {
        $or: userNameCin(search),
        role,
      },
      options
    );
    res.status(httpStatus.OK).send(result);
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      error,
    });
  }
});

const deleteUser = catchAsync(async (req, res) => {
  try {
    const deletedUser = await userService.deleteUserById(req.params.id);
    res.status(httpStatus.OK).send(deletedUser);
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      error,
    });
  }
});

const updateUser = catchAsync(async (req, res) => {
  try {
    const user = await userService.updateUserById(req.params.id, req.body);
    res.send(user);
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      error,
    });
  }
});


module.exports = {
    addUser,
    userDetails,
    getUsers,
    deleteUser,
    updateUser
};
