import { memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { AiOutlineEye, AiOutlineLike } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';

const style = require('./PostSubInfo.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface PostSubInfoProps {
  viewCount: number;
  likeCount: number;
  commentCount: number;
}

const PostSubInfo = ({
  viewCount,
  likeCount,
  commentCount,
}: PostSubInfoProps): JSX.Element => {
  return (
    <div className={cx('PostSubInfo')}>
      <div className={cx('PostSubInfo-InfoWrap')}>
        <AiOutlineLike className={cx('PostSubInfo-InfoWrap-Icon')} />
        <div>{likeCount}</div>
      </div>

      <div className={cx('PostSubInfo-InfoWrap')}>
        <AiOutlineEye className={cx('PostSubInfo-InfoWrap-Icon')} />
        <div>{viewCount}</div>
      </div>

      <div className={cx('PostSubInfo-InfoWrap')}>
        <BiCommentDetail className={cx('PostSubInfo-InfoWrap-Icon')} />
        <div>{commentCount}</div>
      </div>
    </div>
  );
};

export default memo(PostSubInfo);
