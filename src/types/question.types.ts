import { IResponse } from './Response';
import { IUser } from './user.types';

export interface IPageParam {
  idx: string | undefined;
}

export interface IQuestion {
  idx: number;
  title: string;
  introduction: string;
  thumbnail: string;
  contents?: string;
  user: IUser;
  commentCount: number;
  replyCount: number;
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

export interface IQuestionSaveResponse extends IResponse {
  idx?: number;
}

export interface IRecentPostListResponse extends IResponse {
  data: {
    recentPosts: IQuestion[];
  },
}

export interface IPopularQuestionListResponse extends IResponse {
  data: {
    popularPosts: IQuestion[];
  },
}

export interface IQuestionListResponse extends IResponse {
  data: {
    totalCount?: number;
    totalPage?: number;
    posts: IQuestion[];
  },
}

export interface IQuestionResponse extends IResponse {
  data: {
    post: IQuestion;
  },
}