import { useCallback, memo } from 'react';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
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

const TagItem = ({
  postTag,
  isClose = false,
  filterFunction,
}: TagItemProps): JSX.Element => {
  const history: History = useHistory();

  const handlePushToTagPosts = useCallback((): void => {
    if (!isClose) {
      history.push(`/tag-posts/${postTag}`);
    }
  }, [history, isClose, postTag]);

  return (
    <div
      className={cx('TagItem')}
      onClick={handlePushToTagPosts}
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
