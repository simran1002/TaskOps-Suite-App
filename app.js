require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const http = require('http');
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


app.use(
    session({
      secret: process.env.SECRET ,
      resave: false,
      saveUninitialized: true,
    })
  );
  
  app.use(passport.initialize());
  app.use(passport.session());
  
app.use(
    expressWinston.logger({
      transports: [new winston.transports.Console(), new winston.transports.File({ filename: 'express.log' })],
      format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
    })
  );

app.use(errorHandler);

const server = http.createServer(app); 
const io = socketIo(server); 

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/translate', translateRoutes);


io.on('connection', (socket) => {
  console.log('A user connected');


  socket.on('taskUpdated', (updatedTask) => {
    io.emit('taskUpdated', updatedTask);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});


server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
