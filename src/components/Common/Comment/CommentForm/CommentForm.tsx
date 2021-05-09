import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import PreviewTab from './PreviewTab';
import CommentInput from './CommentInput';
import { EComment, ECommentTab } from 'lib/enum/comment';
import CommentPreview from './CommentPreview';
import CommentSubmit from './CommentSubmit';
import ReplyCancel from 'components/Reply/ReplyCancel';
import useComment from 'hooks/comment/useComment';
import useReply from 'hooks/reply/useReply';
import { commentTabs, ICommentTab } from 'lib/models/tabs/commentTabs';
import PreviewTabItem from './PreviewTab/PreviewTabItem';

const style = require('./CommentForm.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface CommentFormProps {
  type: EComment;
  commentIdx?: number;
  onChangeIsReplyWrite?: (isReplyWrite: boolean) => void;
}

const CommentForm = ({
  commentIdx,
  type,
  onChangeIsReplyWrite,
}: CommentFormProps): JSX.Element => {
  const { WRITE } = ECommentTab;
  const { COMMENT, REPLY } = EComment;

  const reply = useReply(commentIdx!);
  const {
    contents,
    onChangeContents,
    requestOfferComment,
    commentInputRef,
    dragRef,
    handleDrop,
    handleDragImage,
  } = useComment();

  const [commentTab, setCommentTab] = useState<ECommentTab>(ECommentTab.WRITE);

  useEffect(() => {
    if (dragRef.current !== null) {
      dragRef.current.addEventListener('drop', (e) => handleDrop(e, handleDragImage), true);
    }
  }, [dragRef, handleDragImage, handleDrop]);

  return (
    <div className={cx('CommentForm')} ref={dragRef}>
      <div className={cx('CommentForm-ContentsWrap')}>
        <PreviewTab>
        {
          commentTabs.map(({ id, name, icon }: ICommentTab) => (
            <PreviewTabItem
              key={id}
              id={id}
              name={name}
              icon={icon}
              commentTab={commentTab}
              setCommentTab={setCommentTab}
            />
          ))
        }
        </PreviewTab>
        {
          commentTab === WRITE ?
          <CommentInput
            type={type}
            contents={type === COMMENT ? contents : reply.contents}
            onChangeContents={type === COMMENT ? onChangeContents : reply.onChangeContents}
            commentInputRef={commentInputRef!}
          />
          :
          <CommentPreview contents={type === COMMENT ? contents : reply.contents} />
        }
      </div>

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
