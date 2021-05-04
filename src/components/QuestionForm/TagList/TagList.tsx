import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import TagItem from 'components/Common/Post/TagItem';

const style = require('./TagList.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface TagListProps {
  postTags: string[];
}

const TagList = ({ postTags }: TagListProps): JSX.Element => {
  return (
    <div className={cx('TagList')}>
      {
        postTags.map((postTag: string, idx: number) => (
          <TagItem key={idx} postTag={postTag} />
        ))
      }
    </div>
  );
};

export default TagList;
