import Button from 'components/Common/Button';
import palette from 'styles/palette';

interface ReplyCancelProps {
  onChangeIsReplyWrite: () => void;
}

const ReplyCancel = ({
  onChangeIsReplyWrite,
}: ReplyCancelProps): JSX.Element => {
  return (
    <Button
      width='85px'
      height='35px'
      handleClick={onChangeIsReplyWrite}
      backgroundColor={palette.lighterBlack}
    >
      취소
    </Button>
  );
};

export default ReplyCancel;
