import { useCallback, useEffect, useState, useMemo } from 'react';
import { createLike, deleteLike, getLikeList } from 'lib/api/like/like.api';
import { ILikeDto } from 'lib/api/like/like.dto';
import { EResponse } from 'lib/enum/response';
import { ILike } from 'types/like.types';
import { IToken } from 'types/user.types';
import { getMyInfo } from 'util/getMyInfo';
import usePageParam from '../util/usePageParam';
import { errorToast } from 'lib/Toast';

const useLike = () => {
  const postIdx: number = usePageParam();
  const myInfo: IToken = useMemo(() => getMyInfo(), []);

  const [likeList, setLikeList] = useState<ILike[]>([]);
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const isAccessable = useCallback((): boolean => {
    if (!myInfo) {
      errorToast('로그인 후 좋아요가 가능합니다.');
      return false;
    }

    return true;
  }, [myInfo]);

  const requestLikeList = useCallback(async () => {
    try {
      const { status, data: { likes } } = await getLikeList(postIdx);

      if (status === EResponse.OK) {
        if (myInfo) {
          setIsPressed(likes.some((like) => like.user.idx === myInfo.idx));
        }

        setLikeList(likes);
      }
    } catch (error) {
      console.log(error);
    }
  }, [myInfo, postIdx]);

  const handlePressLike = useCallback(async (): Promise<void> => {
    try {
      if (!isAccessable()) {
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
  }, [isAccessable, isPressed, likeList, myInfo, postIdx, requestLikeList]);

  useEffect(() => {
    requestLikeList();
  }, [requestLikeList]);

  return {
    likeList,
    isPressed,
    handlePressLike,
  }
}

export default useLike;