import PageTemplate from 'components/Template/PageTemplate';
import ScrollProgress from 'components/Common/Base/ScrollProgress';
import Post from 'components/Post';

const PostPage = (): JSX.Element => {
  return (
    <PageTemplate>
      <ScrollProgress />
      <Post />
    </PageTemplate>
  );
};

export default PostPage;