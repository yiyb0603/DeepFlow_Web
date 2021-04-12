import { useCallback, useEffect, ChangeEvent } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { modifyInfoState, modifyModalState } from 'atom/user';
import { modifyUserInfo } from 'lib/api/user/user.api';
import { IUserModify } from 'lib/api/user/user.dto';
import { EResponse } from 'lib/enum/response';
import useMyInfo from './useMyInfo';
import { successToast } from 'lib/Toast';
import useUserInfo from './useUserInfo';
import { validateModifyInfo } from 'validation/modifyInfo.validation';

const useModifyInfo = () => {
  const { myInfo } = useMyInfo();
  const { renderUserInfo } = useUserInfo();

  const [modifyInfo, setModifyInfo] = useRecoilState<IUserModify>(modifyInfoState);
  const setIsModifyModal = useSetRecoilState<boolean>(modifyModalState);

  const onChangeIsModifyModal = useCallback((): void => {
    setIsModifyModal((prevIsModifyModal: boolean) => !prevIsModifyModal);
  }, [setIsModifyModal]);

  const onChangeName = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;

    setModifyInfo((request: IUserModify) => ({
      ...request,
      name: value,
    }));
  }, [setModifyInfo]);

  const onChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;

    setModifyInfo((request: IUserModify) => ({
      ...request,
      email: value,
    }));
  }, [setModifyInfo]);

  const onChangeDescription = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    
    setModifyInfo((request: IUserModify) => ({
      ...request,
      description: value,
    }));
  }, [setModifyInfo]);

  const onChangeLocation = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    
    setModifyInfo((request: IUserModify) => ({
      ...request,
      location: value,
    }));
  }, [setModifyInfo]);

  const onChangeBlog = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    
    setModifyInfo((request: IUserModify) => ({
      ...request,
      blog: value,
    }));
  }, [setModifyInfo]);

  const onChangePosition = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    
    setModifyInfo((request: IUserModify) => ({
      ...request,
      position: value,
    }));
  }, [setModifyInfo]);

  const onChangeGeneration = useCallback((generation: number): void => {
    setModifyInfo((request: IUserModify) => ({
      ...request,
      generation,
    }));
  }, [setModifyInfo]);

  const onChangeMajor = useCallback((major: number): void => {
    setModifyInfo((request: IUserModify) => ({
      ...request,
      major,
    }));
  }, [setModifyInfo]);

  const requestModifyInfo = useCallback(async (): Promise<void> => {
    try {
      if (!validateModifyInfo(modifyInfo)) {
        return;
      }
      
      const { status } = await modifyUserInfo(modifyInfo);

      if (status === EResponse.OK) {
        successToast('유저 정보 수정을 성공하였습니다.');
        renderUserInfo();
        onChangeIsModifyModal();
      }
    } catch (error) {
      console.log(error);
    }
  }, [modifyInfo, onChangeIsModifyModal, renderUserInfo]);

  useEffect(() => {
    if (myInfo) {
      const { name, avatar, description, location, position, email, blog, generation, major } = myInfo;

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
    }
  }, [myInfo, setModifyInfo]);

  return {
    modifyInfo,
    onChangeIsModifyModal,
    onChangeName,
    onChangeEmail,
    onChangeDescription,
    onChangeLocation,
    onChangeBlog,
    onChangePosition,
    onChangeGeneration,
    onChangeMajor,
    requestModifyInfo,
  }
}

export default useModifyInfo;