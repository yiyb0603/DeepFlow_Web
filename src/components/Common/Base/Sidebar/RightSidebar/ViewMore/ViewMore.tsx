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
    <Link
      to={link}
      className={cx('ViewMore')}
    >
      더보기
    </Link>
  );
};

export default ViewMore;
