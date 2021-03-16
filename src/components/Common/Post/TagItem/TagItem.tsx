import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { MdClose } from 'react-icons/md';

const style = require('./TagItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface TagItemProps {
  postTag: string;
  isClose?: boolean;
  filterFunction?: (postTag: string) => void;
}

const TagItem = ({ postTag, isClose = false, filterFunction }: TagItemProps): JSX.Element => {
  return (
    <div className={cx('TagItem')}>
      {
        isClose &&
        <MdClose
          className={cx('TagItem-Close')}
          onClick={() => filterFunction!(postTag)}
        />
      }
      {postTag}
    </div>
  );
};

export default TagItem;
