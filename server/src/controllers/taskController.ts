import { Request, Response } from 'express';
import { Task } from '../models/task.js';
import { ReqAddTaskBody, ReqEditTaskBody } from '../types/task.js';

export const addTask = (req: ReqAddTaskBody, res: Response) => {
  const { title, createdDate, expiredDate } = req.body;
  const task = new Task({ title, createdDate, expiredDate });
  task.save().then(() => res.status(200).json(task));
};

export const getTaskList = (req: Request, res: Response) => {
  Task.find().then((list) => res.status(200).json(list));
};

export const getSingleTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(400).json({ message: 'Task not Found!' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Task not Found!' });
  }
};

export const changeCompletedStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (task) {
      task.completed = !task.completed;
      task.save();
      res.status(200).json(task);
    } else {
      res.status(400).json({ message: 'Task not Found!' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Task not Found!' });
  }
};

export const updateTask = async (req: ReqEditTaskBody, res: Response) => {
  const { _id, title, createdDate, expiredDate, completed } = req.body;
  try {
    const task = await Task.findById(_id);
    if (task) {
      task.title = title;
      task.createdDate = createdDate;
      task.expiredDate = expiredDate;
      task.completed = completed;
      task.save();
      res.status(200).json(task);
    } else {
      res.status(400).json({ message: 'Task not Found!' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Task not Found!' });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: 'Deleted Successfully!' });
  } catch (error) {
    res.status(400).json({ message: 'Deletion fails!' });
  }
};

export const deleteCompleted = async (_: Request, res: Response) => {
  try {
    await Task.deleteMany({ completed: true });
    res.status(200).json({ message: 'Deleted Successfully!' });
  } catch (error) {
    res.status(400).json({ message: 'Deletion fails!' });
  }
};
