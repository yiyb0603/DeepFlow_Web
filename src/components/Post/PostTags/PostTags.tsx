import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./PostTags.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface PostTagsProps {
  postTags: string[];
}

const PostTags = ({ postTags }: PostTagsProps): JSX.Element => {
  return (
    <div className={cx('PostTags')}>
      {
        postTags.map((tag: string, idx: number) => (
          <div className={cx('PostTags-Tag')} key={idx}>{tag}</div>
        ))
      }
    </div>
  );
};

export default PostTags;
