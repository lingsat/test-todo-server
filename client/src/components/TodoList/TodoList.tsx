import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { getFilteredList, getIsCompletedExist } from "../../utils/task";
import TodoItem from "../TodoItem/TodoItem";
import Filter from "../Filter/Filter";
import { ITodos } from "../../store/types/todos";
import { IFilter } from "../../types/filter";
import styles from "./TodoList.module.scss";
import { taskListAsyncAction } from "../../store/thunk";
import { useStoreDispatch } from "../../store/store";
import Loading from "../../common/components/Loading/Loading";

interface TodoListProps {
  filter: IFilter;
  setFilter: React.Dispatch<React.SetStateAction<IFilter>>;
}

const TodoList: FC<TodoListProps> = ({ filter, setFilter }) => {
  const dispatch = useStoreDispatch();
  const { todos, isLoading } = useSelector((state: ITodos) => state);

  const filteredList = getFilteredList(todos, filter);
  const isCompletedExist = getIsCompletedExist(todos);

  useEffect(() => {
    dispatch(taskListAsyncAction());
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (!todos.length) {
    return <p className={styles.message}>No items found! Create new one.</p>;
  }

  return (
    <>
      <Filter
        filter={filter}
        setFilter={setFilter}
        isCompletedExist={isCompletedExist}
      />
      {!filteredList.length && (
        <p className={styles.message}>
          No tasks found - among &quot;{filter.filterValue}&quot;
        </p>
      )}
      <ul className={styles.list}>
        {filteredList.map((task) => (
          <TodoItem key={task._id} task={task} />
        ))}
      </ul>
    </>
  );
};

export default TodoList;
