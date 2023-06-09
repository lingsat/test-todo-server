import { ITask } from "../types/task";
import { IAction, TodoActionTypes } from "./types/actions";

export const taskListAction = (payload: ITask[]): IAction => ({
  type: TodoActionTypes.TASK_LIST,
  payload,
});

export const startLoadingAction = (): IAction => ({
  type: TodoActionTypes.TASK_START_LOADING,
});

export const endLoadingAction = (): IAction => ({
  type: TodoActionTypes.TASK_END_LOADING,
});

export const addTaskAction = (payload: ITask): IAction => ({
  type: TodoActionTypes.ADD_TASK,
  payload,
});

export const deleteSingleTaskAction = (payload: string): IAction => ({
  type: TodoActionTypes.DELETE_TASK,
  payload,
});

export const editTaskAction = (payload: ITask): IAction => ({
  type: TodoActionTypes.EDIT_TASK,
  payload,
});

export const clearCompletedAction = (): IAction => ({
  type: TodoActionTypes.CLEAR_COMPLETED,
});
