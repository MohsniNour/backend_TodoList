const httpStatus = require('http-status');
// const { userService } = require('.');
const { Todo } = require('../models');
const ApiError = require('../utils/ApiError');
const { errors } = require('../utils/errors.constant');

/**
 * Create task
 * @param {Object} body
 * @returns {Promise<Task>}
 */
const createTodo = async (body) => {
  const todo = await Todo.create(body);
  return todo;
  // const user = await userService.getUserById(appointment.patient);
  // user.patientAppointments.push(appointment.id);
  // await user.save();
  // return appointment.populate(populatePatientAppointment).execPopulate();
};

/**
 * Get task by id
 * @param {ObjectId} id
 * @returns {Promise<Task>}
 */
const getTaskById = async (id) => {
  const todo = await Todo.findById(id);
  if (!todo) {
    throw new ApiError(httpStatus.NOT_FOUND, errors.APPOINTMENT_NOT_FOUND);
  }
  return todo;
};

/**
 * Get get All Tasks
 */
const getTasks = async () => {
  const tasks = Todo.findAll();
  return tasks;
};

/**
 * Update task by id
 * @param {ObjectId} id
 * @param {Object} body
 * @returns {Promise<Office>}
 */
const updateTodo = async (id, body) => {
  const todo = await getTaskById(id);
  Object.assign(todo, { ...body });
  await todo.save();
  // return appointment.populate(populatePatientAppointment).execPopulate();
  return todo;
};

/**
 * Delete task by id
 * @param {ObjectId} id
 * @returns {Promise<Task>}
 */
const deleteTodo = async (id) => {
  const todo = await getTaskById(id);
  // const user = await userService.getUserById(appointment.patient.id);
  // await userService.updateUserById(user.id, {
  //   // eslint-disable-next-line eqeqeq
  //   patientAppointments: user.patientAppointments.filter((element) => element != id),
  // });
  await todo.remove();
  return todo;
};

module.exports = {
  getTasks,
  createTodo,
  getTaskById,
  updateTodo,
  deleteTodo,
};
