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
}

const Post = ({ post }: PostProps): JSX.Element => {
  const { idx, title, category, introduction, contents, thumbnail, postTags, createdAt, user } = post;

  return (
    <div className={cx('Post')}>
      <div className={cx('Post-Title')}>{title}</div>

      <TopInfo
        createdAt={createdAt}
        user={user}
      />
      <PostTags postTags={postTags} />
      <Thumbnail thumbnail={thumbnail!} />

      <div className={cx('Post-Contents')}>
        <MarkdownRender contents={contents!} />
      </div>
    </div>
  );
};

export default Post;
