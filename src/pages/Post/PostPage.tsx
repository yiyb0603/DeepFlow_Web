import PageTemplate from 'components/Template/PageTemplate';
import ScrollProgress from 'components/Common/ScrollProgress';
import PostContainer from 'containers/Post';

const PostPage = (): JSX.Element => {
  return (
    <PageTemplate>
      <ScrollProgress />
      <PostContainer />
    </PageTemplate>
  );
};

export default PostPage;