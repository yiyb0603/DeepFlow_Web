import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./PopularUserItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface PopularUserItemProps {
  idx: number;
  name: string;
  position: string;
  order: number;
  recommandCount: number;
}

const PopularUserItem = ({
  idx,
  name,
  position,
  order,
  recommandCount,
}: PopularUserItemProps): JSX.Element => {
  return (
    <div className={cx('PopularUserItem')}>
      <div>{order}. {name}</div>
    </div>
  );
};

export default PopularUserItem;
