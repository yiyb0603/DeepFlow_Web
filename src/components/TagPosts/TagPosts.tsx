import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import ListItem from 'components/Common/Post/ListItem';
import { IPost } from 'types/post.types';

const style = require('./TagPosts.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface TagPostsProps {
  tagPostList: IPost[];
}

const TagPosts = ({
  tagPostList,
}: TagPostsProps): JSX.Element => {
  return (
    <div className={cx('TagPosts')}>
      <div className={cx('TagPosts-List')}>
        {
          tagPostList.map((tagPost: IPost) => (
            <ListItem
              key={tagPost.idx}
              {...tagPost}
            />
          ))
        }
      </div>
    </div>
  );
};

export default TagPosts;
