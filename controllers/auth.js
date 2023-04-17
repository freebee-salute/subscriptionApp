const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

// Sign up a new user
exports.signup = async (req, res, next) => {
  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ $or: [{ username: req.body.username }, { email: req.body.email }] });
    if (existingUser) {
      const error = new Error('User already exists');
      error.statusCode = 409;
      throw error;
    }

    // Create a new user with the provided data
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    });

    // Save the user to the database
    const savedUser = await user.save();

    // Send a response with the saved user data
    res.status(201).json({
      message: 'User created successfully',
      user: {
        _id: savedUser._id,
        username: savedUser.username,
        email: savedUser.email,
        firstName: savedUser.firstName,
        lastName: savedUser.lastName
      }
    });
  } catch (err) {
    next(err);
  }
};

// Log in an existing user
exports.login = async (req, res, next) => {
  try {
    // Check if the user exists
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 401;
      throw error;
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      const error = new Error('Invalid password');
      error.statusCode = 401;
      throw error;
    }

    // Generate a JWT token and send it in the response
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({
      message: 'Login successful',
      token: token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  } catch (err) {
    next(err);
  }
};
