import express from 'express';

import {
  addTask,
  deleteCompleted,
  deleteTask,
  getSingleTask,
  getTaskList,
  updateTask,
} from '../controllers/taskController.js';

const taskRouter = express.Router();

taskRouter.get('/', getTaskList);
taskRouter.get('/:id', getSingleTask);
taskRouter.post('/', addTask);
taskRouter.put('/update', updateTask);
taskRouter.delete('/completed', deleteCompleted);
taskRouter.delete('/:id', deleteTask);

export default taskRouter;
