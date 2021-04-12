import { MutableRefObject } from 'react';
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
import useComment from 'hooks/comment/useComment';
import useReply from 'hooks/reply/useReply';

const style = require('./CommentForm.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface CommentFormProps {
  commentIdx?: number;
  type: EComment;
  commentInputRef?: MutableRefObject<HTMLTextAreaElement | null>;
  onChangeIsReplyWrite?: (isReplyWrite: boolean) => void;
}

const CommentForm = ({
  commentIdx,
  type,
  commentInputRef,
  onChangeIsReplyWrite,
}: CommentFormProps): JSX.Element => {
  const { WRITE } = ECommentTab;
  const { COMMENT, REPLY } = EComment;

  const { contents, onChangeContents, requestOfferComment } = useComment();
  const reply = useReply(commentIdx!);
  const commentTab = useRecoilValue<ECommentTab>(commentTabState);

  return (
    <div className={cx('CommentForm')}>
      <PreviewTab />
      {
        commentTab === WRITE ?
        <CommentInput
          type={type}
          contents={type === COMMENT ? contents : reply.contents}
          onChangeContents={type === COMMENT ? onChangeContents : reply.onChangeContents}
          commentInputRef={commentInputRef!}
        />
        :
        <CommentPreview contents={contents} />
      }

      <div className={cx('CommentForm-BottomWrap')}>
        {
          type === REPLY &&
          <ReplyCancel
            onChangeIsReplyWrite={() => onChangeIsReplyWrite!(false)}
          />
        }

        <CommentSubmit
          requestOfferComment={type === COMMENT ? requestOfferComment : reply.requestOfferReply}
        />
      </div>
    </div>
  );
};

export default CommentForm;
