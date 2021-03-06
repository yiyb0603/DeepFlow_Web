import { useCallback, ChangeEvent, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { requestQuestionState } from 'lib/recoil/atom/question';
import { IQuestionDto } from 'lib/api/question/question.dto';
import { uploadFiles } from 'lib/api/uploads/uploads.api';
import { EResponse } from 'lib/enum/response';
import useDragDrop from 'hooks/util/useDragDrop';

const useSelectThumbnail = () => {
  const {
    dragRef,
    isDragging,
    setIsDragging,
    handleDrop,
  } = useDragDrop();

  const [request, setRequest] = useRecoilState<IQuestionDto>(requestQuestionState);
  const { thumbnail } = request;

  const onChangeThumbnail = useCallback(async (e: ChangeEvent<HTMLInputElement> | DragEvent): Promise<void> => {
    try {
      let thumbnail: File | null = null;

      if (e instanceof DragEvent) {
        thumbnail = e.dataTransfer?.files[0]!;
      } else {
        thumbnail = e.target.files![0];
      }

      const formData: FormData = new FormData();
      formData.append('images', thumbnail);

      const { status, data: { files } } = await uploadFiles(formData);
      if (status === EResponse.OK) {
        setRequest((request: IQuestionDto) => ({
          ...request,
          thumbnail: files[0],
        }));
      }
    } catch (error) {
      console.log(error);
    }
  }, [setRequest]);

  useEffect(() => {
    if (dragRef.current !== null) {
      dragRef.current.addEventListener('drop', (e) => handleDrop(e, onChangeThumbnail));
    }
  }, [dragRef, handleDrop, onChangeThumbnail]);

  return {
    dragRef,
    isDragging,
    setIsDragging,
    thumbnail,
    onChangeThumbnail,
  };
}

export default useSelectThumbnail;