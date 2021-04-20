import Button from 'components/Common/Button';
import { palette } from 'styles/Palette/Palette';

interface ReplyCancelProps {
  onChangeIsReplyWrite: () => void;
}

const ReplyCancel = ({
  onChangeIsReplyWrite,
}: ReplyCancelProps): JSX.Element => {
  return (
    <Button
      width={'50px'}
      height={'35px'}
      onClick={onChangeIsReplyWrite}
      color={palette.lighterBlack}
    >
      취소
    </Button>
  );
};

export default ReplyCancel;
