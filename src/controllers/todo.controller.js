const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { todoService } = require('../services');
// const { userNameCin } = require('../utils/searchPatterns');

const createTodo = catchAsync(async (req, res) => {
  try {
    const todo = await todoService.createTodo({ ...req.body });
    res.status(httpStatus.CREATED).send(todo);
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      error,
    });
  }
});

const getTasks = catchAsync(async (req, res) => {
  try {
    const result = await todoService.getTasks();
    res.status(httpStatus.OK).send(result);
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      error,
    });
  }
});

const deleteTodo = catchAsync(async (req, res) => {
  try {
    const deletedTodo = await todoService.deleteTodo(req.params.id);
    res.status(httpStatus.OK).send(deletedTodo);
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      error,
    });
  }
});

const updateTodo = catchAsync(async (req, res) => {
  try {
    const todo = await todoService.updateTodo(req.params.id, req.body);
    res.send(todo);
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      error,
    });
  }
});

const getTaskById = catchAsync(async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await todoService.getTaskById(id);
    res.send(todo);
  } catch (error) {
    res.status(error.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json({
      message: error.message,
      error,
    });
  }
});

module.exports = {
  createTodo,
  getTasks,
  getTaskById,
  deleteTodo,
  updateTodo,
};
