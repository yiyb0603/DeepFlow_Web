import { EPost } from "lib/enum/post";

export interface IPostDto {
  category: EPost;
  introduction: string;
  thumbnail: string;
  title: string;
  contents: string;
  postTags: string[];
}