import { ITask } from "../../types/task";

export enum TodoActionTypes {
  TASK_LIST = "task/list",
  TASK_START_LOADING = "task/loading/start",
  TASK_END_LOADING = "task/loading/end",
  ADD_TASK = "task/add",
  DELETE_TASK = "task/delete",
  EDIT_TASK = "task/edit",
  CLEAR_COMPLETED = "task/clear_completed",
}

export interface IAction {
  type: string;
  payload?: ITask | ITask[] | string;
}
