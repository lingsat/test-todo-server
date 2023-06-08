import { Request } from 'express';

export interface ReqAddTaskBody extends Request {
  body: {
    title: string;
    createdDate: string;
    expiredDate: string;
  };
}

export interface ReqEditTaskBody extends Request {
  body: {
    _id: string;
    title: string;
    createdDate: string;
    expiredDate: string;
    completed: boolean;
  };
}
