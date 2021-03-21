import { EPost } from "lib/enum/post";
import { IResponse } from "./Response";
import { IUser } from "./user.types";

export interface IPageParam {
  idx: string | undefined;
}

export interface IPost {
  idx: number;
  category: EPost;
  title: string;
  introduction: string;
  thumbnail: string | null;
  contents?: string;
  user: IUser;
  commentCount: number;
  likeCount: number;
  viewCount: number;
  postTags: string[];
  createdAt: Date;
  updatedAt: Date | null;
  isTemp: boolean;
}

export interface IAllContents {
  thumbnail: string;
  title: string;
  contents: string;
}

export interface IPostSaveResponse extends IResponse {
  idx?: number;
}

export interface IRecentPostListResponse extends IResponse {
  data: {
    recentPosts: IPost[];
  },
}

export interface IPostListResponse extends IResponse {
  data: {
    posts: IPost[];
  },
}

export interface IPostResponse extends IResponse {
  data: {
    post: IPost;
  },
}