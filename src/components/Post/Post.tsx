import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import MarkdownRender from 'components/Common/Markdown/MarkdownRender';
import { IPost } from 'types/post.types';
import PostTags from './PostTags';
import Thumbnail from './Thumbnail';
import TopInfo from './TopInfo';

const style = require('./Post.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface PostProps {
  post: IPost;
  requestDeletePost: (postIdx: number) => Promise<void>;
}

const Post = ({ post, requestDeletePost }: PostProps): JSX.Element => {
  const { idx, title, category, introduction, contents, thumbnail, postTags, createdAt, user } = post;

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

      <div>{introduction}</div>

      <div className={cx('Post-Contents')}>
        <MarkdownRender contents={contents!} />
      </div>
    </div>
  );
};

export default Post;
