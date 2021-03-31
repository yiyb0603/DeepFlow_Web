import { useCallback, useEffect, useState } from 'react';
import { createLike, deleteLike, getLikeList } from 'lib/api/like/like.api';
import { ILikeDto } from 'lib/api/like/like.dto';
import { EResponse } from 'lib/enum/response';
import { ILike } from 'types/like.types';
import { IToken } from 'types/user.types';
import { getMyInfo } from 'util/getMyInfo';
import usePageParam from './util/usePageParam';

const useLike = () => {
  const postIdx: number = usePageParam();
  const myInfo: IToken = getMyInfo();

  const [likeList, setLikeList] = useState<ILike[]>([]);
  const [isPressed, setIsPressed] = useState<boolean>(false);

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
      const likeDto: ILikeDto = {
        postIdx,
      };

      if (!isPressed) {
        await createLike(likeDto);
      } else {
        const pressedLike: ILike | undefined = likeList.find((like: ILike) => like.user.idx === myInfo.idx);

        if (pressedLike !== undefined) {
          await deleteLike(pressedLike.idx, postIdx);
        }
      }

    } catch (error) {
      console.log(error);
    }
  }, [isPressed, likeList, myInfo, postIdx]);

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