import { useCallback } from 'react';
import { checkLoggedIn } from 'util/checkLoggedIn';
import palette from 'styles/palette';
import { historySingleton } from 'lib/singleton/history';
import Button from 'components/Common/Button';

const AskButton = (): JSX.Element => {
  const handlePushToForm = useCallback((): void => {
    if (!checkLoggedIn()) {
      return;
    }

    historySingleton.push('/question-form');
  }, []);

  return (
    <Button
      width='100px'
      height='35px'
      backgroundColor={palette.main}
      handleClick={handlePushToForm}
    >
      질문하기
    </Button>
  );
};

export default AskButton;
