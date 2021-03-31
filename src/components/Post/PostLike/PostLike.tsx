import { useCallback, useState } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { CgUserList } from 'react-icons/cg';
import { ILike } from 'types/like.types';
import LikeSubmit from './LikeSubmit';
import LikeList from './LikeList';

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
  const [isModal, setIsModal] = useState<boolean>(false);

  const onChangeIsModal = useCallback((): void => {
    setIsModal((prevModal: boolean) => !prevModal);
  }, []);

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
        <CgUserList
          className={cx('PostLike-Right-List')}
          onClick={onChangeIsModal}
        />
      </div>

      {
        isModal &&
        <LikeList likeList={likeList} onChangeIsModal={onChangeIsModal} />
      }
    </div>
  );
};

export default PostLike;
