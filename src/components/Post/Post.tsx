import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import MarkdownRender from 'components/Common/Markdown/MarkdownRender';
import CommentContainer from 'containers/Comment';
import LikeContainer from 'containers/Like';
import { IPost } from 'types/post.types';
import { getGithubAddress } from 'util/getGithubAddress';
import PostTags from './PostTags';
import PostUserInfo from './PostUserInfo';
import Thumbnail from './Thumbnail';
import TopInfo from './TopInfo';

const style = require('./Post.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface PostProps {
  post: IPost;
  requestDeletePost: (postIdx: number) => Promise<void>;
}

const Post = ({ post, requestDeletePost }: PostProps): JSX.Element => {
  const { idx, title, contents, thumbnail, postTags, createdAt, user } = post;

  return (
    <div className={cx('Post')}>
      <div className={cx('Post-Title')}>{title}</div>

      <TopInfo
        idx={idx}
        createdAt={createdAt}
        user={user}
        requestDeletePost={requestDeletePost}
      />
      <PostTags postTags={postTags} />
      <Thumbnail thumbnail={thumbnail!} />

      <div className={cx('Post-Contents')}>
        <MarkdownRender contents={contents!} />
      </div>

      <LikeContainer />

      <PostUserInfo
        avatar={user.avatar}
        name={user.name}
        description={user.description}
        blog={user.blog}
        github={getGithubAddress(user.githubId)}
        location={user.location}
      />

      <CommentContainer />
    </div>
  );
};

export default Post;
