import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./PageNumberItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface PageNumberItemProps {
  page: number;
  currentPage: number;
  onChangeCurrentPage: (page: number) => void;
}

const PageNumberItem = ({
  page,
  currentPage,
  onChangeCurrentPage,
}: PageNumberItemProps): JSX.Element => {
  return (
    <div
      className={cx('PageNumberItem', {
        'PageNumberItem-Current': page === currentPage,
      })}
      onClick={() => onChangeCurrentPage(page)}
    >
      {page}
    </div>
  );
};

export default PageNumberItem;
