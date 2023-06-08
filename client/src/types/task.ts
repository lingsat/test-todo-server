export interface ITaskNew {
  _id?: string;
  title: string;
  createdDate: string;
  expiredDate: string;
  completed?: boolean;
}

export interface ITask {
  _id: string;
  title: string;
  createdDate: string;
  expiredDate: string;
  completed: boolean;
}
