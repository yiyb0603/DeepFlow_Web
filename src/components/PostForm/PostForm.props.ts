import { ChangeEvent, KeyboardEvent } from 'react';
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
    onChangeContents: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  };

  handleIsModal: (isModal: boolean) => void;
  requestOfferPost: (isTemp: boolean) => Promise<void>;
}