import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { useHistory } from 'react-router';
import { History } from 'history';
import PostSubInfo from 'components/Common/Post/PostSubInfo';
import { calculateTime } from 'lib/TimeCounting';

const style = require('./PopularItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface PopularItemProps {
  idx: number;
  order: number;
  title: string;
  createdAt: Date | string;
  viewCount: number;
  commentCount: number;
  likeCount: number;
}

const PopularItem = ({
  idx,
  order,
  title,
  createdAt,
  viewCount,
  commentCount,
  likeCount,
}: PopularItemProps) => {
  const history: History<unknown> = useHistory();

  return (
    <div className={cx('PopularItem')}>
      <div
        className={cx('PopularItem-Title')}
        onClick={() => history.push(`/post/${idx}`)}
      >
        {order}. {title}
      </div>

      <div className={cx('PopularItem-SubInfo')}>
        <PostSubInfo
          viewCount={viewCount}
          commentCount={commentCount}
          likeCount={likeCount}
        />

        <div>{calculateTime(createdAt)}</div>
      </div>
    </div>
  );
};

export default PopularItem;
