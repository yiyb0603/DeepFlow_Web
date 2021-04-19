import { useCallback } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import AuthSpinner from '../AuthSpinner';

const style = require('./RegisterSubmit.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface RegisterSubmitProps {
  isLoading: boolean;
  onClick: () => Promise<void>;
}

const RegisterSubmit = ({
  isLoading,
  onClick,
}: RegisterSubmitProps): JSX.Element => {
  const handleSubmit = useCallback((): void => {
    if (isLoading) {
      return;
    }

    onClick();
  }, [isLoading, onClick]);

  return (
    <div className={cx('RegisterSubmit')} onClick={handleSubmit}>
      <div className={cx('RegisterSubmit-Text')}>
        {
          isLoading ? <AuthSpinner /> : '회원가입'
        }
      </div>
    </div>
  );
};

export default RegisterSubmit;
