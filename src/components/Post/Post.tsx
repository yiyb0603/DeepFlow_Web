import FadeIn from 'react-fade-in';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import usePostByIdx from 'hooks/post/usePostByIdx';
import { getGithubAddress } from 'util/getGithubAddress';
import Comment from 'components/Comment';
import Helmet from 'components/Common/Helmet';
import MarkdownRender from 'components/Common/Markdown/MarkdownRender';
import PageLoading from 'components/Common/Loading/PageLoading';
import PostLike from './PostLike';
import PostTags from './PostTags';
import PostUserInfo from './PostUserInfo';
import Thumbnail from './Thumbnail';
import TopInfo from './TopInfo';

const style = require('./Post.scss');
const cx: ClassNamesFn = classNames.bind(style);

const Post = (): JSX.Element => {
  const { post, requestDeletePost } = usePostByIdx();

  return (
    <>
    {
      post === null ? <PageLoading text='글을 불러오는 중입니다 🥴' />
      :
      <FadeIn>
        <div className={cx('Post')}>
          <Helmet
            title={post.title}
            description={post.introduction}
            favicon={post.thumbnail}
          />
          <div className={cx('Post-Title')}>{post.title}</div>

          <TopInfo
            idx={post.idx}
            createdAt={post.createdAt}
            user={post.user}
            requestDeletePost={requestDeletePost}
          />
          <PostTags postTags={post.postTags} />
          <Thumbnail thumbnail={post.thumbnail!} />

          <div className={cx('Post-Contents')}>
            <MarkdownRender contents={post.contents!} />
          </div>

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
        </div>
      </FadeIn>
    }
    </>
  );
};

export default Post;
