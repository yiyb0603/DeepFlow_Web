import Button from 'components/Common/Button';
import { palette } from 'styles/Palette/Palette';

interface ModifySubmitProps {
  requestModifyInfo: () => void;
}

const ModifySubmit = ({
  requestModifyInfo,
}: ModifySubmitProps): JSX.Element => {
  return (
    <Button
      height={'45px'}
      color={palette.main}
      onClick={requestModifyInfo}
    >
      수정하기
    </Button>
  );
};

export default ModifySubmit;
