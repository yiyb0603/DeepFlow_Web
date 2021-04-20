import Button from 'components/Common/Button';
import { palette } from 'styles/Palette/Palette';

interface ModifyButtonProps {
  onClick: () => void;
}

const ModifyButton = ({
  onClick,
}: ModifyButtonProps): JSX.Element => {
  return (
    <Button
      width={'100%'}
      color={palette.main}
      onClick={onClick}
    >
      수정하기
    </Button>
  );
};

export default ModifyButton;
