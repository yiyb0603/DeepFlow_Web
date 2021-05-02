import { useCallback } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { MdClose } from 'react-icons/md';
import { commentContentsState, commentFormLoadingState, modifyState } from 'atom/comment';
import { stringEllipsis } from 'converter/stringEllipsis';
import { palette } from 'styles/Palette/Palette';
import Button from 'components/Common/Button';
import { ICommentModify } from 'types/comment.types';

const style = require('./CommentSubmit.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface CommentSubmitProps {
  requestOfferComment: () => void;
}

const CommentSubmit = ({
  requestOfferComment,
}: CommentSubmitProps) => {
  const isLoading: boolean = useRecoilValue<boolean>(commentFormLoadingState);
  const setContents = useSetRecoilState<string>(commentContentsState);
  const [modifyObject, setModifyObject] = useRecoilState<ICommentModify | null>(modifyState);

  const setModifyNull = useCallback((): void => {
    setContents('');
    setModifyObject(null);
  }, [setContents, setModifyObject]);

  return (
    <div className={cx('CommentSubmit')}>
      <div className={cx('CommentSubmit-Cancel')}>
        {
          modifyObject !== null &&
          <>
            <div className={cx('CommentSubmit-Cancel-Text')}>
              {stringEllipsis(modifyObject.contents, 30)} 댓글 수정하기
            </div>
            <MdClose
              className={cx('CommentSubmit-Cancel-Icon')}
              onClick={setModifyNull}
            />
          </>
        }
      </div>

      <Button
        width={'85px'}
        height={'35px'}
        handleClick={requestOfferComment}
        backgroundColor={palette.main}
        isLoading={isLoading}
      >
        {
          (modifyObject !== null ? '수정' : '작성')
        }
      </Button>
    </div>
  );
};

export default CommentSubmit;
