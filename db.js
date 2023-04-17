const mongoose = require('mongoose');

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String }
});

// Define the schema for the Subscription model
const subscriptionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  billingPeriod: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

// Define the User and Subscription models using the schemas
const User = mongoose.model('User', userSchema);
const Subscription = mongoose.model('Subscription', subscriptionSchema);

// Export the User and Subscription models
module.exports = { User, Subscription };
