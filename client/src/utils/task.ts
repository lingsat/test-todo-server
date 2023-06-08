import { getCorrectDateStr } from "./date";
import { ITask, ITaskNew } from "../types/task";
import { FilterValue, IFilter } from "../types/filter";
import { DatesDelay } from "../types/datesDelay";

export const createNewTask = (
  title: string,
  createdDate = getCorrectDateStr(),
  expiredDate = getCorrectDateStr(DatesDelay.ONE_DAY_AFTER)
): ITaskNew => {
  return { title, createdDate, expiredDate };
};

export const createUpdatedTask = (
  title: string,
  _id: string,
  createdDate: string,
  expiredDate: string,
  completed: boolean
): ITask => {
  return { _id, title, createdDate, expiredDate, completed };
};

export const getInvalidSymError = (sym: string) => {
  const specSymRegex = /[#$%^&*{}`|<>]/g;

  if (specSymRegex.test(sym)) {
    return '"#$%^&*{}`|<>" - symbols not available';
  }
  return "";
};

const checkSearchInTitle = (task: ITask, searchValue: string): boolean => {
  const formatedSearchValue = searchValue.toLowerCase().trim();
  return task.title.toLowerCase().includes(formatedSearchValue);
};

export const getFilteredList = (
  todoList: ITask[],
  filter: IFilter
): ITask[] => {
  let filteredList = [];

  switch (filter.filterValue) {
    case FilterValue.ACTIVE:
      filteredList = todoList.filter((task) => {
        const isSearchInTitle = checkSearchInTitle(task, filter.searchValue);
        if (!task.completed && isSearchInTitle) return task;
      });
      break;
    case FilterValue.COMPLETED:
      filteredList = todoList.filter((task) => {
        const isSearchInTitle = checkSearchInTitle(task, filter.searchValue);
        if (task.completed && isSearchInTitle) return task;
      });
      break;
    default:
      filteredList = todoList.filter((task) =>
        checkSearchInTitle(task, filter.searchValue)
      );
      break;
  }
  return filteredList;
};

export const getIsCompletedExist = (todoList: ITask[]): boolean => {
  const completedList = todoList.filter((item) => item.completed);
  return !!completedList.length;
};
