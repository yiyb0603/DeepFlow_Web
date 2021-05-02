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
      backgroundColor={palette.main}
      handleClick={onClick}
      margin={'0.5rem 0 0 0'}
    >
      수정하기
    </Button>
  );
};

export default ModifyButton;
