const mongoose = require('mongoose');

// Define the schema for the Subscription model
const subscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  plan: { type: String, enum: ['basic', 'premium', 'ultimate'], required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true }
});

// Define a virtual property to calculate the duration of the subscription
subscriptionSchema.virtual('duration').get(function () {
  const diff = this.endDate.getTime() - this.startDate.getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return days;
});

// Define the Subscription model using the schema
const Subscription = mongoose.model('Subscription', subscriptionSchema);

// Export the Subscription model
module.exports = Subscription;
