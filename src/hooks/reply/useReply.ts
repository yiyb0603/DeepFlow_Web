import useDragDrop from 'hooks/util/useDragDrop';
import useDeleteReply from './useDeleteReply';
import useOfferReply from './useOfferReply';

const useReply = (commentIdx: number) => {
  const { dragRef } = useDragDrop();

  const {
    contents,
    onChangeContents,
    replyInputRef,
    handleDragImage,
    requestOfferReply,
  } = useOfferReply(commentIdx);

  const { requestDeleteReply } = useDeleteReply();

  return {
    contents,
    onChangeContents,

    replyDragRef: dragRef,
    replyInputRef,
    handleDragImage,

    requestOfferReply,
    requestDeleteReply,
  };
}

export default useReply;