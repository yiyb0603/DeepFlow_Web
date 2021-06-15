import { useCallback, memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import calculateTime from 'lib/calculateTime';
import { historySingleton } from 'lib/singleton/history';
import PostSubInfo from 'components/Common/Post/PostSubInfo';

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
  const handlePushToQuestionPage = useCallback((): void => {
    historySingleton.push(`/question/${idx}`);
  }, [idx]);

  return (
    <div className={cx('PopularQuestionItem')}>
      <div
        className={cx('PopularQuestionItem-LinkWrap')}
        onClick={handlePushToQuestionPage}
      >
        <img
          src={thumbnail}
          className={cx('PopularQuestionItem-LinkWrap-Thumbnail')}
          alt='thumbnail'
        />

        <div
          className={cx('PopularQuestionItem-LinkWrap-Title')}
        >
          {order}. {title}
        </div>
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
