import { ChangeEvent, MutableRefObject } from 'react';
import { useRecoilValue } from 'recoil';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import PreviewTab from './PreviewTab';
import CommentInput from './CommentInput';
import { commentTabState } from 'atom/comment';
import { EComment, ECommentTab } from 'lib/enum/comment';
import CommentPreview from './CommentPreview';
import CommentSubmit from './CommentSubmit';
import ReplyCancel from 'components/Reply/ReplyCancel';

const style = require('./CommentForm.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface CommentFormProps {
  contentsState: {
    contents: string;
    onChangeContents: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  };

  commentInputRef?: MutableRefObject<HTMLTextAreaElement | null>;
  requestOfferComment: () => Promise<void>;
  onChangeIsReplyWrite?: (isReplyWrite: boolean) => void;
  type: EComment;
}

const CommentForm = ({
  contentsState,
  commentInputRef,
  requestOfferComment,
  onChangeIsReplyWrite,
  type,
}: CommentFormProps): JSX.Element => {
  const { WRITE } = ECommentTab;
  const { REPLY } = EComment;
  const commentTab = useRecoilValue<ECommentTab>(commentTabState);

  return (
    <div className={cx('CommentForm')}>
      <PreviewTab />
      {
        commentTab === WRITE ?
        <CommentInput
          type={type}
          contentsState={contentsState}
          commentInputRef={commentInputRef!}
        />
        :
        <CommentPreview contents={contentsState.contents} />
      }

      <div className={cx('CommentForm-BottomWrap')}>
        {
          type === REPLY &&
          <ReplyCancel onChangeIsReplyWrite={() => onChangeIsReplyWrite!(false)} />
        }
        <CommentSubmit requestOfferComment={requestOfferComment} />
      </div>
    </div>
  );
};

export default CommentForm;
