import { useCallback, useEffect, useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { isLikePressedState, likeListState } from 'atom/like';
import usePageParam from 'hooks/util/usePageParam';
import { getMyInfo } from 'util/getMyInfo';
import { getLikeList } from 'lib/api/like/like.api';
import { EResponse } from 'lib/enum/response';
import { ILike } from 'types/like.types';
import { IToken } from 'types/user.types';

const useLikeList = () => {
  const postIdx: number = usePageParam();
  const myInfo: IToken = useMemo(() => getMyInfo(), []);

  const [likeList, setLikeList] = useRecoilState<ILike[]>(likeListState);
  const [isPressed, setIsPressed] = useRecoilState<boolean>(isLikePressedState);

  const requestLikeList = useCallback(async (): Promise<void> => {
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
  }, [myInfo, postIdx, setIsPressed, setLikeList]);

  useEffect(() => {
    if (Number.isInteger(postIdx)) {
      requestLikeList();
    }
  }, [postIdx, requestLikeList]);

  return {
    isPressed,
    likeList,
    requestLikeList,
  };
}

export default useLikeList;