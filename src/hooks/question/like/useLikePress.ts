import { useCallback, useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { isLikePressedState } from 'lib/recoil/atom/like';
import usePageParam from 'hooks/util/usePageParam';
import { createLike, deleteLike } from 'lib/api/like/like.api';
import { ILikeDto } from 'lib/api/like/like.dto';
import { ILike } from 'types/like.types';
import { IToken } from 'types/user.types';
import { checkLoggedIn } from 'util/checkLoggedIn';
import { getMyInfo } from 'util/getMyInfo';
import useLikeList from './useLikeList';

const useLikePress = () => {
  const postIdx: number = usePageParam();
  const { likeList, requestLikeList } = useLikeList();

  const myInfo: IToken = useMemo(() => getMyInfo(), []);
  const isPressed: boolean = useRecoilValue<boolean>(isLikePressedState);

  const handlePressLike = useCallback(async (): Promise<void> => {
    try {
      if (!checkLoggedIn()) {
        return;
      }

      if (!isPressed) {
        const likeDto: ILikeDto = {
          postIdx,
        };
        await createLike(likeDto);
      } else {
        const pressedLike: ILike | undefined = likeList.find((like: ILike) => like.user.idx === myInfo.idx);

        if (pressedLike !== undefined) {
          await deleteLike(pressedLike.idx, postIdx);
        }
      }

      requestLikeList();
    
    } catch (error) {
      console.log(error);
    }
  }, [isPressed, likeList, myInfo, postIdx, requestLikeList]);
  
  return {
    isPressed,
    handlePressLike,
  };
}

export default useLikePress;