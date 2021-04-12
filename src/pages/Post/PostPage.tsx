import { memo } from 'react';
import PageTemplate from 'components/Template/PageTemplate';
import ScrollProgress from 'components/Common/ScrollProgress';
import Post from 'components/Post';

const PostPage = (): JSX.Element => {
  return (
    <PageTemplate>
      <ScrollProgress />
      <Post />
    </PageTemplate>
  );
};

export default memo(PostPage);