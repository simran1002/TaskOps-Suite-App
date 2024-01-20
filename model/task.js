const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Incomplete', 'Ongoing', 'Completed'],
    default: 'Incomplete',
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
