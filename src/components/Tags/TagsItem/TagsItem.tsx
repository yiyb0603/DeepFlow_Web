import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./TagsItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface TagsItemProps {
  name: string;
  description: string;
  count: number;
}

const TagsItem = ({
  name,
  description,
  count,
}: TagsItemProps): JSX.Element => {
  return (
    <div className={cx('TagsItem')}>
      <div className={cx('TagsItem-Top')}>
        <div className={cx('TagsItem-Top-Name')}>{name}</div>

        <div className={cx('TagsItem-Top-Description')}>
          {description}
        </div>
      </div>

      <div className={cx('TagsItem-Count')}>총 {count}개의 포스트</div>
    </div>
  );
};

export default TagsItem;
