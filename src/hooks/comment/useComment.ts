import useDragDrop from 'hooks/util/useDragDrop';
import useCommentList from './useCommentList';
import useOfferComment from './useOfferComment';
import useDeleteComment from './useDeleteComment';

const useComment = () => {
  const { dragRef, handleDrop } = useDragDrop(); 

  const { commentList, requestCommentList } = useCommentList();
  const {
    contents,
    onChangeContents,
    onModifyClick,
    requestOfferComment,
    commentInputRef,
    handleDragImage,
  } = useOfferComment();

  const { requestDeleteComment } = useDeleteComment();

  return {
    contents,
    onChangeContents,

    commentDragRef: dragRef,
    handleDrop,
    handleDragImage,

    onModifyClick,
    commentInputRef,

    commentList,
    requestCommentList,

    requestOfferComment,
    requestDeleteComment,
  };
};

export default useComment;