import { useRef, useCallback, useEffect, useState, ChangeEvent, memo } from 'react';
import { useRecoilState } from 'recoil';
import SelectThumbnail from 'components/PostForm/SubmitModal/SelectThumbnail';
import { uploadFiles } from 'lib/api/uploads/uploads.api';
import { requestPostState } from 'atom/post';
import { IPostDto } from 'lib/api/post/post.dto';
import { EResponse } from 'lib/enum/response';

const SelectThumbnailContainer = (): JSX.Element => {
  const dragRef = useRef<HTMLDivElement | null>(null);

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [request, setRequest] = useRecoilState<IPostDto>(requestPostState);

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

      const { status, data } = await uploadFiles(formData);
      if (status === EResponse.OK) {
        setRequest((request: IPostDto) => ({
          ...request,
          thumbnail: data.files[0],
        }));
      }
    } catch (error) {
      console.log(error);
    }
  }, [setRequest]);

  const handleDragIn = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragOut = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer!.files) {
      setIsDragging(true);
    }
  }, []);

  const handleDrop = useCallback(async (e: DragEvent): Promise<void> => {
    try {
      e.preventDefault();
      e.stopPropagation();
      onChangeThumbnail(e);
    } catch (error) {
      console.log(error);
    } finally {
      setIsDragging(false);
    }
  }, [onChangeThumbnail]);

  const initDragEvents = useCallback((): void => {
    if (dragRef.current !== null) {
      dragRef.current.addEventListener('dragenter', handleDragIn);
      dragRef.current.addEventListener('dragleave', handleDragOut);
      dragRef.current.addEventListener('dragover', handleDragOver);
      dragRef.current.addEventListener('drop', handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  const resetDragEvents = useCallback((): void => {
    if (dragRef.current !== null) {
      dragRef.current.removeEventListener('dragenter', handleDragIn);
      dragRef.current.removeEventListener('dragleave', handleDragOut);
      dragRef.current.removeEventListener('dragover', handleDragOver);
      dragRef.current.removeEventListener('drop', handleDrop);
    }
  }, [handleDragIn, handleDragOut, handleDragOver, handleDrop]);

  useEffect(() => {
    initDragEvents();

    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents]);

  return (
    <SelectThumbnail
      dragRef={dragRef}
      isDragging={isDragging}
      setIsDragging={setIsDragging}
      thumbnail={thumbnail}
      onChangeThumbnail={onChangeThumbnail}
    />
  );
};

export default memo(SelectThumbnailContainer);