import { useCallback, useState } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai';
import { IReply, IReplyModify } from 'types/reply.types';
import ReplyContainer from 'containers/Reply';
import ReplyWriteButton from 'components/Reply/ReplyWriteButton';
import ReplyFormContainer from 'containers/Reply/ReplyForm';
import { modifyReplyState, replyContents } from 'atom/reply';
import usePageParam from 'hooks/util/usePageParam';

const style = require('./ToggleReply.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface ToggleReplyProps {
  commentIdx: number;

  isShowReplyState: {
    isShowReply: boolean;
    onChangeIsShowReply: () => void;
  };

  replies: IReply[];
}

const ToggleReply = ({
  commentIdx,
  isShowReplyState,
  replies,
}: ToggleReplyProps): JSX.Element => {
  const { isShowReply, onChangeIsShowReply } = isShowReplyState;
  const postIdx: number = usePageParam();

  const setContents = useSetRecoilState<string>(replyContents);
  const [modifyReply, setModifyReply] = useRecoilState<IReplyModify | null>(modifyReplyState);
  
  const [isReplyWrite, setIsReplyWrite] = useState<boolean>(false);

  const onChangeIsReplyWrite = useCallback((): void => {
    setIsReplyWrite((prevReplyWrite: boolean) => !prevReplyWrite);
    setModifyReply(null);
  }, [setModifyReply]);

  const onClickModifyReply = useCallback((idx: number, contents: string): void => {
    setModifyReply({
      idx,
      contents,
      postIdx,
      commentIdx,
    });
    
    setContents(contents);
    setIsReplyWrite(false);
  }, [commentIdx, postIdx, setContents, setModifyReply]);

  return (
    <>
      <div className={cx('ToggleReply')} onClick={onChangeIsShowReply}>
        {
          isShowReply ? <AiOutlineMinusSquare /> : <AiOutlinePlusSquare />
        }
        <div className={cx('ToggleReply-Text')}>{replies.length}개의 답글</div>
      </div>

      {
        isShowReply &&
        replies.length > 0 && replies.map(({ idx, contents, createdAt, updatedAt, user, fk_comment_idx }) => (
          <ReplyContainer
            key={idx}
            idx={idx}
            contents={contents}
            createdAt={createdAt}
            updatedAt={updatedAt}
            user={user}
            commentIdx={fk_comment_idx}
            onChangeIsReplyWrite={onChangeIsReplyWrite}
            onClickModifyReply={onClickModifyReply}
          />
        ))
      }

      {
        !isReplyWrite &&
        <ReplyWriteButton
          onChangeIsReplyWrite={onChangeIsReplyWrite}
        />
      }

      {
        isReplyWrite && modifyReply === null &&
        <ReplyFormContainer
          commentIdx={commentIdx}
          onChangeIsReplyWrite={onChangeIsReplyWrite}
        />
      }
    </>
  );
};

export default ToggleReply;
