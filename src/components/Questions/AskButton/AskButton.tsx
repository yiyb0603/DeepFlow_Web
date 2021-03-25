import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./AskButton.scss');
const cx: ClassNamesFn = classNames.bind(style);

const AskButton = (): JSX.Element => {
  return (
    <button className={cx('AskButton')}>질문하기</button>
  );
};

export default AskButton;
