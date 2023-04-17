const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the schema for the User model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String }
});

// Add a pre-save hook to hash the password before saving the user to the database
userSchema.pre('save', async function (next) {
  try {
    // Only hash the password if it has been modified or is new
    if (!this.isModified('password')) {
      return next();
    }

    // Generate a salt and hash the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);

    // Set the password to the hashed password
    this.password = hashedPassword;
    next();
  } catch (err) {
    return next(err);
  }
});

// Add a method to the User model to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword, next) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    return next(err);
  }
};

// Define the User model using the schema
const User = mongoose.model('User', userSchema);

// Export the User model
module.exports = User;
