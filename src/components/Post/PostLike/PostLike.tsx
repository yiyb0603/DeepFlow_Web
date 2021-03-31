import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { CgUserList } from 'react-icons/cg';
import { ILike } from 'types/like.types';
import LikeSubmit from './LikeSubmit';

const style = require('./PostLike.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface PostLikeProps {
  isPressed: boolean;
  likeList: ILike[];
  handlePressLike: () => Promise<void>;
}

const PostLike = ({
  isPressed,
  likeList,
  handlePressLike,
}: PostLikeProps): JSX.Element => {
  return (
    <div className={cx('PostLike')}>
      <div className={cx('PostLike-Left')}>
        <LikeSubmit
          isPressed={isPressed}
          likeCount={likeList.length}
          handlePressLike={handlePressLike}
        />

        <div className={cx('PostLike-Left-SubText')}>
          글이 마음에 들으셨나요?
        </div>
      </div>

      <div className={cx('PostLike-Right')}>
        <CgUserList className={cx('PostLike-Right-List')} />
      </div>
    </div>
  );
};

export default PostLike;
