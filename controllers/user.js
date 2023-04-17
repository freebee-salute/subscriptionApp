const User = require('../models/user');

// Get a list of all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}, '_id username email firstName lastName');
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

// Get a single user by ID
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId, '_id username email firstName lastName');
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

// Update a user by ID
exports.updateUserById = async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
      $set: {
        username: req.body.username,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName
      }
    }, { new: true });
    if (!updatedUser) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

// Delete a user by ID
exports.deleteUserById = async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    if (!deletedUser) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    next(err);
  }
};
