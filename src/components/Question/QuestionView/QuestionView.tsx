import usePostByIdx from 'hooks/post/usePostByIdx';
import { getGithubAddress } from 'util/getGithubAddress';
import Comment from 'components/Comment';
import Helmet from 'components/Common/Helmet';
import MarkdownRender from 'components/Common/Markdown/MarkdownRender';
import PageLoading from 'components/Common/Loading/PageLoading';
import PostTitle from 'components/Common/Post/PostTitle';
import PostViewTemplate from 'components/Common/Post/PostViewTemplate';
import TopInfo from 'components/Common/Post/TopInfo';
import PostLike from './PostLike';
import PostTags from './PostTags';
import Thumbnail from './Thumbnail';
import PostUserInfo from './PostUserInfo';

const QuestionView = (): JSX.Element => {
  const { post, requestDeletePost } = usePostByIdx();

  return (
    <>
    {
      post === null ? <PageLoading text='글을 불러오는 중입니다 🥴' />
      :
      <PostViewTemplate>
        <Helmet
          title={post.title}
          description={post.introduction}
          favicon={post.thumbnail}
        />

        <PostTitle
          title={post.title}
        />

        <TopInfo
          idx={post.idx}
          createdAt={post.createdAt}
          user={post.user}
          requestDeletePost={requestDeletePost}
        />

        <PostTags
          postTags={post.postTags}
        />
        
        <Thumbnail
          thumbnail={post.thumbnail!}
        />

        <MarkdownRender contents={post.contents!} />

        <PostLike />

        <PostUserInfo
          idx={post.user.idx}
          avatar={post.user.avatar}
          name={post.user.name}
          description={post.user.description}
          blog={post.user.blog}
          github={getGithubAddress(post.user.githubId)}
          location={post.user.location}
        />

        <Comment />
      </PostViewTemplate>
    }
    </>
  );
};

export default QuestionView;
