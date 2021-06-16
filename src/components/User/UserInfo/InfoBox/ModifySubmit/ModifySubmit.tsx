import palette from 'styles/palette';
import Button from 'components/Common/Button';

interface ModifySubmitProps {
  modifyLoading: boolean;
  requestModifyInfo: () => void;
}

const ModifySubmit = ({
  modifyLoading,
  requestModifyInfo,
}: ModifySubmitProps): JSX.Element => {
  return (
    <Button
      width='100%'
      height='45px'
      backgroundColor={palette.main}
      isLoading={modifyLoading}
      handleClick={requestModifyInfo}
    >
      수정하기
    </Button>
  );
};

export default ModifySubmit;
