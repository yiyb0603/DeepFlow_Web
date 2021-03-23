import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./Generation.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface GenerationProps {
  text: string;
}

const Generation = ({ text }: GenerationProps): JSX.Element => {
  return (
    <div className={cx('Generation')}>{text}</div>
  );
};

export default Generation;
