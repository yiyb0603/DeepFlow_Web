import { EMajor } from "lib/enum/majors";
import { IResponse } from "./Response";

export interface IGithubUser {
  avatar: string;
  description: string;
  githubId: string;
  location: string;
  name: string;
  blog: string;
}

export interface IRegisterRequest {
  githubInfo: IGithubUser,
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