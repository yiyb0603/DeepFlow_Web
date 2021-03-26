import PageLoading from 'components/Common/PageLoading';
import Post from 'components/Post';
import usePostByIdx from 'hooks/usePostByIdx';

const PostContainer = (): JSX.Element => {
  const { post, requestDeletePost } = usePostByIdx();

  return (
    <>
    {
      post === null ?
      <PageLoading text='글을 불러오는 중입니다 🥴' /> :
      <Post
        post={post}
        requestDeletePost={requestDeletePost}
      />
    }
    </>
  );
};

export default PostContainer;