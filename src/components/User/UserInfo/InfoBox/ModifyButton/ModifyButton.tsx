import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./ModifyButton.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface ModifyButtonProps {
  onClick: () => void;
}

const ModifyButton = ({
  onClick,
}: ModifyButtonProps): JSX.Element => {
  return (
    <button
      className={cx('ModifyButton')}
      onClick={onClick}
    >
      수정하기
    </button>
  );
};

export default ModifyButton;
