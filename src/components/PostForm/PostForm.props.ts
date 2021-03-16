import { ChangeEvent, KeyboardEvent, LegacyRef } from 'react';
import Editor from 'react-markdown-editor-lite';
import { EPost } from 'lib/enum/post';

export default interface PostFormProps {
  titleState: {
    title: string;
    onChangeTitle: (e: ChangeEvent<HTMLInputElement>) => void;
  };

  categoryState: {
    category: EPost;
    onChangeCategory: (category: EPost) => void;
  };

  tagInputState: {
    tagInput: string;
    onChangeTagInput: (e: ChangeEvent<HTMLInputElement>) => void;
  };

  postTagState: {
    postTags: string[];
    onChangePostTags: () => void;
  };

  onKeydownTagInput: (e: KeyboardEvent<HTMLInputElement>) => void;
  handleFilterPostTag: (tagName: string) => void;

  contentsState: {
    contents: string;
    onChangeContents: (text: string) => void;
  };

  requestCreatePost: (isTemp: boolean) => Promise<void>;
}