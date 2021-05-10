import { useCallback, memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { MdClose } from 'react-icons/md';
import { historySingleton } from 'lib/singleton/history';

const style = require('./TagItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface TagItemProps {
  postTag: string;
  isClose?: boolean;
  filterFunction?: (postTag: string) => void;
}

const TagItem = ({
  postTag,
  isClose = false,
  filterFunction,
}: TagItemProps): JSX.Element => {
  const handlePushToTagQuestions = useCallback((): void => {
    if (!isClose) {
      historySingleton.push(`/tag-questions/${postTag}`);
    }
  }, [isClose, postTag]);

  return (
    <div
      className={cx('TagItem')}
      onClick={handlePushToTagQuestions}
    >
      {
        isClose &&
        <MdClose
          className={cx('TagItem-Close')}
          onClick={() => filterFunction!(postTag)}
        />
      }
      <div className={cx('TagItem-Text')}>{postTag}</div>
    </div>
  );
};

export default memo(TagItem);
