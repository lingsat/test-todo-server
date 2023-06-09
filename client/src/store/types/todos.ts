import { ITask } from "../../types/task";

export interface ITodos {
  todos: ITask[];
  isLoading: boolean;
}
