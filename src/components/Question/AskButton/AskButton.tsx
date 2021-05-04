import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import { checkLoggedIn } from 'util/checkLoggedIn';
import { palette } from 'styles/Palette/Palette';
import Button from 'components/Common/Button';

const AskButton = (): JSX.Element => {
  const history: History = useHistory();
  const handlePushToForm = useCallback((): void => {
    if (!checkLoggedIn()) {
      return;
    }

    history.push('/post-form');
  }, [history]);

  return (
    <Button
      width={'100px'}
      height={'35px'}
      backgroundColor={palette.main}
      handleClick={handlePushToForm}
    >
      질문하기
    </Button>
  );
};

export default AskButton;
