import { ReactNode, useCallback } from 'react';
import { SetterOrUpdater, useRecoilState, useSetRecoilState } from 'recoil';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { commentIdxState, isShowReplyState, replyContents } from 'atom/reply';
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';
import { IReply } from 'types/reply.types';
import usePageParam from 'hooks/util/usePageParam';
import ReplyWriteButton from 'components/Reply/ReplyWriteButton';
import ReplyItem from 'components/Reply/ReplyItem';
import useOfferReply from 'hooks/reply/useOfferReply';

const style = require('./ToggleReply.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface ToggleReplyProps {
  commentIdx: number;
  replies: IReply[];
  isReplyWrite: boolean;
  onChangeIsReplyWrite: (isReplyWrite?: boolean) => void;
  children: ReactNode;
}

const ToggleReply = ({
  commentIdx,
  replies,
  isReplyWrite,
  onChangeIsReplyWrite,
  children,
}: ToggleReplyProps): JSX.Element => {
  const questionIdx: number = usePageParam();
  const { modifyObject, setModifyObject } = useOfferReply(commentIdx);

  const [writeCommentIdx, setWriteCommentIdx] = useRecoilState<number>(commentIdxState);
  const [isShowReply, setIsShowReply] = useRecoilState<boolean>(isShowReplyState);

  const setContents: SetterOrUpdater<string> = useSetRecoilState<string>(replyContents);

  const onClick = useCallback((): void => {
    setWriteCommentIdx(commentIdx);
    onChangeIsReplyWrite(true);
    setContents('');
  }, [commentIdx, onChangeIsReplyWrite, setContents, setWriteCommentIdx]);

  const onChangeIsShowReply = useCallback((): void => {
    if (!replies || replies.length <= 0) {
      return;
    }

    setWriteCommentIdx(commentIdx);
    setIsShowReply((prevShowReply: boolean) => !prevShowReply);
  }, [commentIdx, replies, setIsShowReply, setWriteCommentIdx]);

  const onClickModifyReply = useCallback((idx: number, contents: string): void => {
    setModifyObject({
      idx,
      contents,
      postIdx: questionIdx,
      commentIdx,
    });
    
    setContents(contents);
    onChangeIsReplyWrite(false);
  }, [commentIdx, onChangeIsReplyWrite, questionIdx, setContents, setModifyObject]);

  const onCancel = useCallback((): void => {
    setContents('');
    onChangeIsReplyWrite(false);
    setModifyObject(null);
  }, [onChangeIsReplyWrite, setContents, setModifyObject]);

  return (
    <>
      <div className={cx('ToggleReply')} onClick={onChangeIsShowReply}>
        {
          (isShowReply && writeCommentIdx === commentIdx) ?
          <AiOutlineMinusSquare />
          :
          <AiOutlinePlusSquare />
        }
        <span className={cx('ToggleReply-Text')}>{replies.length}개의 답글</span>
      </div>

      {
        (isShowReply && writeCommentIdx === commentIdx) &&
          replies.length > 0 && replies.map((reply: IReply) => {
          const { idx, contents, createdAt, updatedAt, user, fk_comment_idx } = reply;
          
          return (
            <ReplyItem
              key={idx}
              idx={idx}
              contents={contents}
              createdAt={createdAt}
              updatedAt={updatedAt}
              user={user}
              commentIdx={fk_comment_idx}
              onChangeIsReplyWrite={onCancel}
              modifyObject={modifyObject}
              onClickModifyReply={onClickModifyReply}
            />
          );
        })
      }

      {children}

      {
        ((!isReplyWrite || writeCommentIdx !== commentIdx) && modifyObject === null) &&
        <ReplyWriteButton
          onClick={onClick}
        />
      }
    </>
  );
};

export default ToggleReply;
