import { useCallback } from 'react';
import { useHistory } from 'react-router';
import { History } from 'history';
import { getMyInfo } from 'util/getMyInfo';
import { errorToast } from 'lib/Toast';
import Button from 'components/Common/Button';
import { palette } from 'styles/Palette/Palette';

const AskButton = (): JSX.Element => {
  const history: History = useHistory();
  const handlePushToForm = useCallback((): void => {
    if (!getMyInfo()) {
      errorToast('로그인 후 이용가능합니다.');
      return;
    }

    history.push('/post-form');
  }, [history]);

  return (
    <Button
      width={'100px'}
      height={'35px'}
      color={palette.main}
      onClick={handlePushToForm}
    >
      질문하기
    </Button>
  );
};

export default AskButton;
