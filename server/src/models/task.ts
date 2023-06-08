import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  createdDate: {
    type: String,
  },
  expiredDate: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export const Task = mongoose.model('task', taskSchema);
