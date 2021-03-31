import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { AiOutlineLike } from 'react-icons/ai';

const style = require('./LikeSubmit.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface LikeSubmitProps {
  isPressed: boolean;
  likeCount: number;
  handlePressLike: () => Promise<void>;
}

const LikeSubmit = ({
  isPressed,
  likeCount,
  handlePressLike,
}: LikeSubmitProps): JSX.Element => {
  return (
    <div className={cx('LikeSubmit')}>
      <AiOutlineLike
        className={cx('LikeSubmit-Like', {
          'LikeSubmit-Like-Pressed': isPressed,
        })}
        onClick={handlePressLike}
      />
      <span className={cx('LikeSubmit-Text')}>{likeCount}개</span>
    </div>
  );
};

export default LikeSubmit;
