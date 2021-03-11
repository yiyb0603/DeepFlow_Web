import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import AuthSpinner from '../AuthSpinner';

const style = require('./RegisterSubmit.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface RegisterSubmitProps {
  isLoading: boolean;
  onClick: () => Promise<void>;
}

const RegisterSubmit = ({ isLoading, onClick }: RegisterSubmitProps): JSX.Element => {
  return (
    <div className={cx('RegisterSubmit')} onClick={onClick}>
      <div className={cx('RegisterSubmit-Text')}>
        {
          isLoading ? <AuthSpinner /> : '회원가입'
        }
      </div>
    </div>
  );
};

export default RegisterSubmit;
