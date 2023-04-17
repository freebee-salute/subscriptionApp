const Subscription = require('../models/subscription');
const User = require('../models/user');

// Get all subscriptions for a user
exports.getSubscriptionsByUser = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find({ user: req.params.userId });
    res.status(200).json(subscriptions);
  } catch (err) {
    next(err);
  }
};

// Create a new subscription for a user
exports.createSubscription = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;
      throw error;
    }
    const subscription = new Subscription({
      user: user._id,
      name: req.body.name,
      price: req.body.price,
      duration: req.body.duration
    });
    await subscription.save();
    res.status(201).json(subscription);
  } catch (err) {
    next(err);
  }
};

// Update a subscription by ID
exports.updateSubscriptionById = async (req, res, next) => {
  try {
    const updatedSubscription = await Subscription.findByIdAndUpdate(req.params.subscriptionId, {
      $set: {
        name: req.body.name,
        price: req.body.price,
        duration: req.body.duration
      }
    }, { new: true });
    if (!updatedSubscription) {
      const error = new Error('Subscription not found');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json(updatedSubscription);
  } catch (err) {
    next(err);
  }
};

// Delete a subscription by ID
exports.deleteSubscriptionById = async (req, res, next) => {
  try {
    const deletedSubscription = await Subscription.findByIdAndDelete(req.params.subscriptionId);
    if (!deletedSubscription) {
      const error = new Error('Subscription not found');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: 'Subscription deleted successfully' });
  } catch (err) {
    next(err);
  }
};
