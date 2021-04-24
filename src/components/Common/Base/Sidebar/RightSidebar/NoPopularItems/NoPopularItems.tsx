import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./NoPopularItems.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface NoPopularItemsProps {
  title: string;
}

const NoPopularItems = ({
  title,
}: NoPopularItemsProps): JSX.Element => {
  return (
    <div className={cx('NoPopularItems')}>{title}</div>
  );
};

export default NoPopularItems;
