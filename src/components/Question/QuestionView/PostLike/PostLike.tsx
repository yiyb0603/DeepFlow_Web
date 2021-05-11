import { useCallback, useState } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { CgUserList } from 'react-icons/cg';
import Toast from 'lib/Toast';
import useLikeList from 'hooks/question/like/useLikeList';
import useLikePress from 'hooks/question/like/useLikePress';
import LikeSubmit from './LikeSubmit';
import LikeList from './LikeList';

const style = require('./PostLike.scss');
const cx: ClassNamesFn = classNames.bind(style);

const PostLike = (): JSX.Element => {
  const { isPressed, handlePressLike } = useLikePress();
  const { likeList } = useLikeList();
  const [isModal, setIsModal] = useState<boolean>(false);

  const onChangeIsModal = useCallback((): void => {
    if (!isModal && (!likeList || likeList.length <= 0)) {
      Toast.infoToast('현재 좋아요 목록이 없습니다.');
      return;
    }

    setIsModal((prevModal: boolean) => !prevModal);
  }, [isModal, likeList]);

  return (
    <>
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
      </div>

      {
        isModal &&
        <LikeList
          likeList={likeList}
          onChangeIsModal={onChangeIsModal}
        />
      }
    </>
  );
};

export default PostLike;
