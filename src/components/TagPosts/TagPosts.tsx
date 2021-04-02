import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import ListItem from 'components/Common/Post/ListItem';
import { IPost } from 'types/post.types';
import { ITag } from 'types/tag.types';
import TagInfo from './TagInfo';

const style = require('./TagPosts.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface TagPostsProps {
  tagInfo: ITag;
  tagPostList: IPost[];
}

const TagPosts = ({
  tagInfo,
  tagPostList,
}: TagPostsProps): JSX.Element => {
  return (
    <div className={cx('TagPosts')}>
      <TagInfo tagInfo={tagInfo} />

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
