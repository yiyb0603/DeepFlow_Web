import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { Link } from 'react-router-dom';

const style = require('./ViewMore.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface ViewMoreProps {
  link: string;
}

const ViewMore = ({
  link,
}: ViewMoreProps): JSX.Element => {
  return (
    <div className={cx('ViewMore')}>
      <Link
        to={link}
        className={cx('ViewMore-Link')}
      >
        더보기
      </Link>
    </div>
  );
};

export default ViewMore;
