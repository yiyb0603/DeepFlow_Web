import { IResponse } from "./Response";
import { IUser } from "./user.types";

export interface INotice {
  idx: number;
  title: string;
  introduction: string;
  contents: string;
  user: IUser;
  createdAt: Date | string;
  updatedAt: Date | null;
}

export interface INoticeResponse extends IResponse {
  data: {
    notices: INotice[];
  },
}