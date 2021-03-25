import { userInfoState } from "atom/user";
import { getUserInfo } from "lib/api/user/user.api";
import { EResponse } from "lib/enum/response";
import { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";
import usePageParam from "./util/usePageParam";

const useUserInfo = () => {
  const userIdx: number = usePageParam();
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const requestUserInfo = useCallback(async (): Promise<void> => {
    try {
      const { status, data: { user } } = await getUserInfo(userIdx);

      if (status === EResponse.OK) {
        setUserInfo(user);
      }
    } catch (error) {
      console.log(error);
    }
  }, [setUserInfo, userIdx]);
  
  useEffect(() => {
    if (Number.isInteger(userIdx)) {
      requestUserInfo();
    }
  }, [requestUserInfo, userIdx]);

  return {
    userInfo,
    setUserInfo,
  };
}

export default useUserInfo;