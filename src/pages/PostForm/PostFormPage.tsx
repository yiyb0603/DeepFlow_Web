import { memo } from 'react';
import PostForm from 'components/PostForm';

const PostFormPage = (): JSX.Element => {
  return (
    <PostForm />
  );
};

export default memo(PostFormPage);