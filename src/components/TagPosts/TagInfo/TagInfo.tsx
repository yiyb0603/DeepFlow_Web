import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { ITag } from 'types/tag.types';

const style = require('./TagInfo.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface TagInfoProps {
  tagInfo: ITag;
  count: number;
}

const TagInfo = ({
  tagInfo,
  count,
}: TagInfoProps) => {
  const { name, description } = tagInfo;

  return (
    <div className={cx('TagInfo')}>
      <div className={cx('TagInfo-Title')}># {name}</div>

      <div className={cx('TagInfo-Description')}>{description}</div>
      <div className={cx('TagInfo-Count')}>총 {count}개의 포스트</div>
    </div>
  );
};

export default TagInfo;
