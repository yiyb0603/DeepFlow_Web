import ReplyItem from 'components/Reply/ReplyItem';
import useReply from 'hooks/useReply';
import { IUser } from 'types/user.types';

interface ReplyContainerProps {
  idx: number;
  contents: string;
  createdAt: Date | string;
  updatedAt: Date | string | null;
  user: IUser;
  commentIdx: number;
  onChangeIsReplyWrite: () => void;
  onClickModifyReply: (idx: number, contents: string) => void;
}

const ReplyContainer = ({
  idx,
  contents,
  createdAt,
  updatedAt,
  user,
  commentIdx,
  onChangeIsReplyWrite,
  onClickModifyReply,
}: ReplyContainerProps): JSX.Element => {
  const { requestDeleteReply } = useReply();

  return (
    <ReplyItem
      idx={idx}
      contents={contents}
      createdAt={createdAt}
      updatedAt={updatedAt}
      user={user}
      commentIdx={commentIdx}
      onClickModifyReply={onClickModifyReply}
      onChangeIsReplyWrite={onChangeIsReplyWrite}
      requestDeleteReply={requestDeleteReply}
    />
  );
}

export default ReplyContainer;