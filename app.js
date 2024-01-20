// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http'); // Import the HTTP module
const socketIo = require('socket.io');
const session = require('express-session');
const passport = require('passport');
const authRoutes = require('./routes/auth');
const winston = require('winston');
const expressWinston = require('express-winston');
const authRoutes = require('./routes/auth');
const errorHandler = require('./errorMiddleware');
const translateRoutes = require('./routes/translate');

const tasksRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 5000;


// Use session to track authentication state
app.use(
    session({
      secret: 'your-secret-key', // Replace with a strong secret
      resave: false,
      saveUninitialized: true,
    })
  );
  
  app.use(passport.initialize());
  app.use(passport.session());
  
// Initialize winston logging for express
app.use(
    expressWinston.logger({
      transports: [new winston.transports.Console(), new winston.transports.File({ filename: 'express.log' })],
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    })
  );

  // Include authentication routes
  app.use('/auth', authRoutes);

const server = http.createServer(app); // Create an HTTP server
const io = socketIo(server); // Attach Socket.IO to the server

// Connect to MongoDB
mongoose.connect('mongodb://localhost/todo_app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/tasks', tasksRoutes);

app.use('/api/translate', translateRoutes);

// Socket.IO event for real-time updates
io.on('connection', (socket) => {
  console.log('A user connected');

  // Example: Broadcasting updates to all connected clients when a task is updated
  socket.on('taskUpdated', (updatedTask) => {
    io.emit('taskUpdated', updatedTask);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
