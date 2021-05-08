import { memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import PostSubInfo from 'components/Common/Post/PostSubInfo';
import { calculateTime } from 'lib/TimeCounting';

const style = require('./PopularQuestionItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface PopularQuestionItemProps {
  idx: number;
  order: number;
  title: string;
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
  createdAt,
  viewCount,
  commentCount,
  replyCount,
  likeCount,
}: PopularQuestionItemProps) => {
  const history: History = useHistory();

  return (
    <div className={cx('PopularQuestionItem')}>
      <div
        className={cx('PopularQuestionItem-Title')}
        onClick={() => history.push(`/question/${idx}`)}
      >
        {order}. {title}
      </div>

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
