import { useCallback } from 'react';
import { useHistory } from 'react-router';
import { History } from 'history';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { getMyInfo } from 'util/getMyInfo';
import { errorToast } from 'lib/Toast';

const style = require('./AskButton.scss');
const cx: ClassNamesFn = classNames.bind(style);

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
    <button
      className={cx('AskButton')}
      onClick={handlePushToForm}
    >
      질문하기
    </button>
  );
};

export default AskButton;
