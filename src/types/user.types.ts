import { EMajor } from "lib/enum/majors";
import { IResponse } from "./Response";

export interface IToken {
  idx: number;
  githubId: string;
}

export interface IGithubUser {
  avatar: string;
  description: string;
  githubId: string;
  location: string;
  name: string;
  blog: string;
}

export interface IRegisterRequest extends IGithubUser {
  generation: number;
  major: EMajor;
  position: string;
}

export interface IGithubResponse extends IResponse {
  data: {
    githubInfo: IGithubUser;
    accessToken: string;
  },
}

export interface ILoginResponse extends IResponse {
  data: {
    accessToken: string;
  },
}

export interface IUser {
  idx: number;
  githubId: string;
  name: string;
  generation: number;
  major: EMajor;
  location: string;
  blog: string;
  position: string;
  avatar: string;
  description: string;
  rank: number;
  joinedAt: Date | string;
  isAdmin: boolean;
}

export interface IUserResponse extends IResponse {
  data: {
    user: IUser;
  },
}

export interface IUserListResponse extends IResponse {
  data: {
    users: IUser[];
  },
}