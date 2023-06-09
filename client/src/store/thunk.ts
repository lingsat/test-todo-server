import { Dispatch } from "redux";
import { ITask, ITaskNew } from "../types/task";
import {
  addTaskAction,
  clearCompletedAction,
  deleteSingleTaskAction,
  editTaskAction,
  endLoadingAction,
  startLoadingAction,
  taskListAction,
} from "./actionCreators";

export const taskListAsyncAction = () => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(startLoadingAction());
      const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
        method: "GET",
      });

      if (response.ok) {
        const taskList: ITask[] = await response.json();
        dispatch(taskListAction(taskList));
      }
    } catch (error) {
      console.error("Error creating task:", error);
      dispatch(endLoadingAction());
    }
  };
};

export const createTaskAsyncAction = (newTask: ITaskNew) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        const savedTask: ITask = await response.json();
        dispatch(addTaskAction(savedTask));
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };
};

export const deleteTaskAsyncAction = (taskId: string) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/${taskId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        dispatch(deleteSingleTaskAction(taskId));
      }
    } catch (error) {
      console.error("Error delete task:", error);
    }
  };
};

export const clearCompletedAsyncAction = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/completed`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        dispatch(clearCompletedAction());
      }
    } catch (error) {
      console.error("Error delete completed:", error);
    }
  };
};

export const editTaskAsyncAction = (changedTask: ITaskNew) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(changedTask),
      });

      if (response.ok) {
        const updatedTask: ITask = await response.json();
        dispatch(editTaskAction(updatedTask));
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };
};
