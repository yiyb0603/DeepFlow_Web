import { useState, useCallback, useEffect, useRef, ChangeEvent } from 'react';

const useDragDrop = () => {
  const dragRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);

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

  const handleDrop = useCallback(
    (
      e: DragEvent,
      callback: (e: ChangeEvent<HTMLInputElement> | DragEvent) => Promise<void>
    ): void => {
    try {
      e.preventDefault();
      e.stopPropagation();
      callback(e);
    } catch (error) {
      console.log(error);
    } finally {
      setIsDragging(false);
    }
  }, []);

  const initDragEvents = useCallback((): void => {
    if (dragRef.current !== null) {
      dragRef.current.addEventListener('dragenter', handleDragIn);
      dragRef.current.addEventListener('dragleave', handleDragOut);
      dragRef.current.addEventListener('dragover', handleDragOver);
    }
  }, [handleDragIn, handleDragOut, handleDragOver]);

  const resetDragEvents = useCallback((): void => {
    if (dragRef.current !== null) {
      dragRef.current.removeEventListener('dragenter', handleDragIn);
      dragRef.current.removeEventListener('dragleave', handleDragOut);
      dragRef.current.removeEventListener('dragover', handleDragOver);
    }
  }, [handleDragIn, handleDragOut, handleDragOver]);

  useEffect(() => {
    initDragEvents();

    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents]);

  return {
    dragRef,
    isDragging,
    setIsDragging,
    handleDrop,
  };
}

export default useDragDrop;