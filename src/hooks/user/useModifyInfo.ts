import { useCallback, useEffect, ChangeEvent } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { modifyInfoState, modifyModalState } from 'lib/recoil/atom/user/myInfo';
import { modifyUserInfo } from 'lib/api/user/user.api';
import { IUserModify } from 'lib/api/user/user.dto';
import { EResponse } from 'lib/enum/response';
import Toast from 'lib/Toast';
import { validateModifyInfo } from 'validation/modifyInfo.validation';
import useMyInfo from './useMyInfo';
import useUserCallback from 'hooks/callback/useUserCallback';
import isNullOrUndefined from 'util/isNullOrUndefined';

const useModifyInfo = () => {
  const { myInfo } = useMyInfo();
  const { requestUserCallback } = useUserCallback();

  const [modifyInfo, setModifyInfo] = useRecoilState<IUserModify>(modifyInfoState);
  const setIsModifyModal = useSetRecoilState<boolean>(modifyModalState);

  const onChangeIsModifyModal = useCallback((): void => {
    setIsModifyModal((prevIsModifyModal: boolean) => !prevIsModifyModal);
  }, [setIsModifyModal]);

  const onChangeRequest = useCallback((
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ): void => {
    const { name, value } = e.target;

    setModifyInfo((request: IUserModify) => ({
      ...request,
      [name]: value,
    }));
  }, [setModifyInfo]);

  const requestModifyInfo = useCallback(async (): Promise<void> => {
    try {
      if (!validateModifyInfo(modifyInfo)) {
        return;
      }
      
      const { status } = await modifyUserInfo(modifyInfo);

      if (status === EResponse.OK) {
        Toast.successToast('유저 정보 수정을 성공하였습니다.');
        requestUserCallback();
        onChangeIsModifyModal();
      }
    } catch (error) {
      console.log(error);
    }
  }, [modifyInfo, onChangeIsModifyModal, requestUserCallback]);

  const handleSetModifyInfo = useCallback(() => {
    if (isNullOrUndefined(myInfo)) {
      return;
    }

    const { name, avatar, description, location, position, email, blog, generation, major } = myInfo!;

    setModifyInfo((modifyInfo) => ({
      ...modifyInfo,
      name,
      avatar,
      description,
      location,
      position,
      email,
      blog,
      generation,
      major,
    }));
  }, [myInfo, setModifyInfo]);

  useEffect(() => {
    handleSetModifyInfo();
  }, [handleSetModifyInfo]);

  return {
    modifyInfo,
    onChangeIsModifyModal,
    onChangeRequest,
    requestModifyInfo,
  };
}

export default useModifyInfo;