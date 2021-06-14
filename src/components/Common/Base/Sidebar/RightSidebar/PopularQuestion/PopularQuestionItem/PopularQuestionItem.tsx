import { memo } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import PostSubInfo from 'components/Common/Post/PostSubInfo';
import calculateTime from 'lib/calculateTime';

const style = require('./PopularQuestionItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface PopularQuestionItemProps {
  idx: number;
  order: number;
  title: string;
  thumbnail: string;
  createdAt: Date | string;
  viewCount: number;
  commentCount: number;
  replyCount: number;
  likeCount: number;
}

const PopularQuestionItem = ({
  idx,
  order,
  title,
  thumbnail,
  createdAt,
  viewCount,
  commentCount,
  replyCount,
  likeCount,
}: PopularQuestionItemProps): JSX.Element => {
  return (
    <div className={cx('PopularQuestionItem')}>
      <img
        src={thumbnail}
        className={cx('PopularQuestionItem-Thumbnail')}
        alt='thumbnail'
      />

      <Link
        to={`/question/${idx}`}
        className={cx('PopularQuestionItem-Title')}
      >
        {order}. {title}
      </Link>

      <div className={cx('PopularQuestionItem-SubInfo')}>
        <PostSubInfo
          viewCount={viewCount}
          commentCount={commentCount + replyCount}
          likeCount={likeCount}
        />

        <div className={cx('PopularQuestionItem-SubInfo-CreatedAt')}>
          {calculateTime(createdAt)}
        </div>
      </div>
    </div>
  );
};

export default memo(PopularQuestionItem);
