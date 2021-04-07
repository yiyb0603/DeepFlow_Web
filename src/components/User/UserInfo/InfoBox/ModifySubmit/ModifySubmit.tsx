import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./ModifySubmit.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface ModifySubmitProps {
  requestModifyInfo: () => void;
}

const ModifySubmit = ({
  requestModifyInfo,
}: ModifySubmitProps): JSX.Element => {
  return (
    <button
      className={cx('ModifySubmit')}
      onClick={requestModifyInfo}
    >
      수정하기
    </button>
  );
};

export default ModifySubmit;
