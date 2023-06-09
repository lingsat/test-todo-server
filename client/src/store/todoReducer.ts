import { ITask } from "../types/task";
import { IAction, TodoActionTypes } from "./types/actions";
import { ITodos } from "./types/todos";

const initialState: ITodos = {
  todos: [],
  isLoading: false,
};

export const todoReducer = (
  state: ITodos = initialState,
  action: IAction
): ITodos => {
  const { type, payload } = action;
  switch (type) {
    case TodoActionTypes.TASK_LIST:
      return { todos: payload as ITask[], isLoading: false };

    case TodoActionTypes.TASK_START_LOADING:
      return { ...state, isLoading: true };

    case TodoActionTypes.TASK_END_LOADING:
      return { ...state, isLoading: false };

    case TodoActionTypes.ADD_TASK:
      return { ...state, todos: [payload as ITask, ...state.todos] };

    case TodoActionTypes.DELETE_TASK: {
      const filteredList = state.todos.filter((task) => task._id !== payload);
      return { ...state, todos: filteredList };
    }

    case TodoActionTypes.EDIT_TASK: {
      const editedTask = payload as ITask;
      const changedList = state.todos.map((task) =>
        task._id === editedTask._id ? editedTask : task
      );
      return { ...state, todos: changedList };
    }

    case TodoActionTypes.CLEAR_COMPLETED: {
      const filteredList = state.todos.filter((task) => !task.completed);
      return { ...state, todos: filteredList };
    }

    default:
      return state;
  }
};
