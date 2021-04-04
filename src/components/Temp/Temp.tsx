import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./Temp.scss');
const cx: ClassNamesFn = classNames.bind(style);

const Temp = (): JSX.Element => {
  return (
    <div className={cx('Temp')}>
      
    </div>
  );
};

export default Temp;
