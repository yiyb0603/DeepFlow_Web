import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import TagItem from 'components/Common/Post/TagItem';

const style = require('./PostTags.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface PostTagsProps {
  postTags: string[];
}

const PostTags = ({
  postTags,
}: PostTagsProps): JSX.Element => {
  return (
    <div className={cx('PostTags')}>
      {
        postTags.map((tag: string, idx: number) => (
          <TagItem
            key={idx}
            postTag={tag}
          />
        ))
      }
    </div>
  );
};

export default PostTags;
