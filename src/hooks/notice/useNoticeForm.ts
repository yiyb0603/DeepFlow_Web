import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { initialNoticeState, requestNoticeState } from 'atom/notice';
import useFocus from 'hooks/util/useFocus';
import { INoticeDto } from 'lib/api/notice/notice.dto';
import { createNotice, modifyNotice } from 'lib/api/notice/notice.api';
import { successToast } from 'lib/Toast';
import { checkLoggedIn } from 'util/checkLoggedIn';
import { validateNotice } from 'validation/notice.validation';
import useNoticeByIdx from './useNoticeByIdx';

const useNoticeForm = () => {
  const history = useHistory();
  const { notice, noticeIdx } = useNoticeByIdx();
  const [isContentsFocus, onChangeIsContentsFocus] = useFocus();
 
  const [contents, setContents] = useState<string>('');
  const [request, setRequest] = useRecoilState<INoticeDto>(requestNoticeState);

  const onChangeTitle = useCallback((e: ChangeEvent<HTMLTextAreaElement>): void => {
    const { value } = e.target;

    setRequest((prevRequest: INoticeDto) => ({
      ...prevRequest,
      title: value,
    }));
  }, [setRequest]);

  const onChangeContents = useCallback((text: string): void => {
    setRequest((prevRequest: INoticeDto) => ({
      ...prevRequest,
      contents: text,
    }));

    setContents(text);
  }, [setRequest]);

  const requestOfferNotice = useCallback(async (): Promise<void> => {
    try {
      if (!checkLoggedIn() || !validateNotice(request)) {
        return;
      }

      if (Number.isInteger(noticeIdx)) {
        await modifyNotice(noticeIdx, request);
      } else {
        await createNotice(request);
      }

      successToast(`공지사항을 ${Number.isInteger(noticeIdx) ? '수정' : '작성'}하였습니다.`);
      setRequest(initialNoticeState);
      history.push('/notice');
    } catch (error) {
      console.log(error);
    }
  }, [history, noticeIdx, request, setRequest]);

  const handleSetProperties = useCallback((): void => {
    if (notice !== null) {
      const { title, contents } = notice;

      setRequest({
        title,
        contents,
      });
      setContents(contents);
    }
  }, [notice, setRequest]);

  const handleKeyEvents = useCallback((e: globalThis.KeyboardEvent): void => {
    if (e.key === 'Tab') {
      e.preventDefault();
      document.execCommand('insertText', false, '\t');
    }
  }, []);

  useEffect(() => {
    if (notice !== null) {
      handleSetProperties();
    }

    return () => setRequest(initialNoticeState);
  }, [handleSetProperties, notice, setRequest]);

  useEffect(() => {
    if (isContentsFocus) {
      document.addEventListener('keydown', handleKeyEvents, true);

      return () => {
        document.removeEventListener('keydown', handleKeyEvents, true);
      }
    }
  }, [handleKeyEvents, isContentsFocus]);

  return {
    onChangeIsContentsFocus,
    request,
    onChangeTitle,
    contents,
    onChangeContents,
    requestOfferNotice,
  };
}

export default useNoticeForm;