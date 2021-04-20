import { useRecoilState, useSetRecoilState } from 'recoil';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { commentContentsState, modifyState } from 'atom/comment';
import { MdClose } from 'react-icons/md';
import { useCallback } from 'react';
import { stringEllipsis } from 'converter/stringEllipsis';
import Button from 'components/Common/Button';
import { palette } from 'styles/Palette/Palette';

const style = require('./CommentSubmit.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface CommentSubmitProps {
  requestOfferComment: () => void;
}

const CommentSubmit = ({
  requestOfferComment,
}: CommentSubmitProps) => {
  const setContents = useSetRecoilState<string>(commentContentsState);
  const [modifyObject, setModifyObject] = useRecoilState(modifyState);

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
        onClick={requestOfferComment}
        color={palette.green}
      >
        Comment
      </Button>
    </div>
  );
};

export default CommentSubmit;
