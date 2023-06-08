import { ITask } from "../types/task";
import { IAction, TodoActionTypes } from "./types/actions";
import { ITodos } from "./types/todos";

const initialState: ITodos = {
  todos: [],
};

export const todoReducer = (
  state: ITodos = initialState,
  action: IAction
): ITodos => {
  const { type, payload } = action;
  switch (type) {
    case TodoActionTypes.TASK_LIST:
      return { todos: payload as ITask[] };

    case TodoActionTypes.ADD_TASK:
      return { todos: [payload as ITask, ...state.todos] };

    case TodoActionTypes.TOGGLE_COMPLETE: {
      const changedTask = payload as ITask;
      const toggledList = state.todos.map((task) => {
        return task._id !== changedTask._id ? task : changedTask;
      });
      return { todos: toggledList };
    }

    case TodoActionTypes.DELETE_TASK: {
      const filteredList = state.todos.filter((task) => task._id !== payload);
      return { todos: filteredList };
    }

    case TodoActionTypes.EDIT_TASK: {
      const editedTask = payload as ITask;
      const changedList = state.todos.map((task) =>
        task._id === editedTask._id ? editedTask : task
      );
      return { todos: changedList };
    }

    case TodoActionTypes.CLEAR_COMPLETED: {
      const filteredList = state.todos.filter((task) => !task.completed);
      return { todos: filteredList };
    }

    default:
      return state;
  }
};
