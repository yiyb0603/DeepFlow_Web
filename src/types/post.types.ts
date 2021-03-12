import { EPost } from "lib/enum/post";
import { IResponse } from "./Response";
import { IUser } from "./user.types";

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

export interface IPostListResponse extends IResponse {
  data: {
    recentPosts: IPost[];
  },
}