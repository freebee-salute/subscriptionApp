const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const authController = require('./controllers/auth');
const userController = require('./controllers/user');
const subscriptionController = require('./controllers/subscription');

const app = express();

// Set up session middleware
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// Set up middleware to parse JSON requests
app.use(express.json());

// Set up authentication routes
app.post('/register', authController.register);
app.post('/login', authController.login);
app.post('/logout', authController.logout);

// Set up user routes
app.get('/users/:id', userController.getUser);
app.put('/users/:id', userController.updateUser);

// Set up subscription routes
app.get('/subscriptions', subscriptionController.getAllSubscriptions);
app.post('/subscriptions', subscriptionController.createSubscription);
app.get('/subscriptions/:id', subscriptionController.getSubscription);
app.put('/subscriptions/:id', subscriptionController.updateSubscription);
app.delete('/subscriptions/:id', subscriptionController.deleteSubscription);

// Set up error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Something went wrong' });
});

// Connect to MongoDB and start the server
mongoose.connect('mongodb://localhost:27017/subscriptions', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
      console.log('Server listening on port 3000');
    });
  })
  .catch((err) => {
    console.error(err);
  });
