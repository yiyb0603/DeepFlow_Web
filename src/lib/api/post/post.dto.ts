import { EPost } from "lib/enum/post";

export interface IPostDto {
  readonly category: EPost;
  readonly introduction: string;
  readonly thumbnail: string;
  readonly title: string;
  readonly contents: string;
  readonly postTags: string[];
  readonly isTemp: boolean;
}