import React, {
  ChangeEvent,
  FC,
  FormEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { getCorrectDateStr } from "../../utils/date";
import {
  createNewTask,
  createUpdatedTask,
  getInvalidSymError,
} from "../../utils/task";
import { ThemeContext } from "../../App";
import Button from "../../common/components/Button/Button";
import Input from "../../common/components/Input/Input";
import { DatesDelay } from "../../types/datesDelay";
import { FilterValue, IFilter } from "../../types/filter";
import styles from "./Modal.module.scss";
import { createTaskAsyncAction, editTaskAsyncAction } from "../../store/thunk";
import { useStoreDispatch } from "../../store/store";

interface ModalProps {
  editMode?: boolean;
  title: string;
  _id?: string;
  createdDate?: string;
  expiredDate?: string;
  completed?: boolean;
  onToggleModal: () => void;
  setFilter?: React.Dispatch<React.SetStateAction<IFilter>>;
}

const Modal: FC<ModalProps> = ({
  editMode = false,
  title,
  _id = crypto.randomUUID(),
  createdDate = getCorrectDateStr(),
  expiredDate = getCorrectDateStr(DatesDelay.ONE_DAY_AFTER),
  completed = false,
  onToggleModal,
  setFilter,
}) => {
  const { lightMode } = useContext(ThemeContext);

  const [modalData, setModalData] = useState({
    title: title.trim(),
    createdDate,
    expiredDate,
  });
  const [errorMessage, setErrorMessage] = useState<string>("");

  const dispatch = useStoreDispatch();

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const errorMessage = getInvalidSymError(event.target.value);

    if (!errorMessage) {
      setModalData((prevData) => ({
        ...prevData,
        title: event.target.value,
      }));
    }
    setErrorMessage(errorMessage);
  };

  const handleCreatedDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setModalData((prevData) => ({
        ...prevData,
        createdDate: event.target.value,
      }));
    }
  };

  const handleExpiredDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value) {
      setModalData((prevData) => ({
        ...prevData,
        expiredDate: event.target.value,
      }));
    }
  };

  const handleFormSubmit = (event: FormEvent) => {
    event.preventDefault();

    const trimmedTitle = modalData.title.trim();
    const { createdDate, expiredDate } = modalData;
    if (trimmedTitle) {
      if (editMode) {
        const task = createUpdatedTask(
          trimmedTitle,
          _id,
          createdDate,
          expiredDate,
          completed
        );
        dispatch(editTaskAsyncAction(task));
      } else {
        const task = createNewTask(trimmedTitle, createdDate, expiredDate);
        dispatch(createTaskAsyncAction(task));
        if (setFilter) {
          setFilter({ filterValue: FilterValue.ALL, searchValue: "" });
        }
      }
      onToggleModal();
    } else {
      setErrorMessage("Title can`t be empty!");
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <div className={styles.bg}>
      <div className={`${styles.modal} ${!lightMode && styles.dark}`}>
        <h2 className={styles.title}>{editMode ? "Edit" : "Add"} Task</h2>
        <form className={styles.form} onSubmit={handleFormSubmit}>
          <Input
            placeholder="Enter Task Title"
            value={modalData.title}
            onChange={handleTitleChange}
          />
          <p className={`${styles.error} ${!lightMode && styles.dark}`}>
            {errorMessage}
          </p>
          <label className={styles.label}>
            Created Date
            <Input
              type="datetime-local"
              value={modalData.createdDate}
              min={getCorrectDateStr(DatesDelay.TEN_MIN_AGO)}
              max={getCorrectDateStr(DatesDelay.TEN_YEARS_AFTER)}
              onChange={handleCreatedDateChange}
            />
          </label>
          <label className={styles.label}>
            Expired Date
            <Input
              type="datetime-local"
              value={modalData.expiredDate}
              min={getCorrectDateStr(
                DatesDelay.TEN_MIN_AFTER,
                new Date(modalData.createdDate)
              )}
              max={getCorrectDateStr(DatesDelay.TEN_YEARS_AFTER)}
              onChange={handleExpiredDateChange}
            />
          </label>
          <div className={styles.buttons}>
            <Button text="Cancel" style="red" onClick={onToggleModal} />
            <Button text="Save" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
