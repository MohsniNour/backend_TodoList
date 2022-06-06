/* eslint-disable no-await-in-loop */
const httpStatus = require('http-status');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const { errors } = require('../utils/errors.constant');
const genUsername = require('../utils/genUsername');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
//create user
const createUser = async (userBody) => {
  let exist = false;
  let userName;
  do {
    userName = genUsername(userBody.firstName, userBody.lastName);
    // eslint-disable-next-line no-await-in-loop
    // eslint-disable-next-line security/detect-non-literal-fs-filename
    exist = await User.exists({ userName });
  } while (exist);

  const user = await User.create({ ...userBody, userName, password: userName });
  return user;
};
/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options, select) => {
  const users = await User.paginate(filter, options, select);
  return users;
};
/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
//getUserById
const getUserById = async (id) => {
  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, errors.USER_NOT_FOUND);
  }
  return user;
};
/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);

  const { userName } = updateBody;

  if (userName && user.userName !== userName) {
    if (await User.isUserNameTaken(userName, userId))
      throw new ApiError(httpStatus.BAD_REQUEST, errors.USERNAME_ALREADY_USED);
    user.status.confirmed = false;
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};
/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  await user.remove();
  return user;
};

module.exports = {
  createUser,
  queryUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
