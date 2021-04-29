import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { useHistory } from 'react-router-dom';
import { History } from 'history';

const style = require('./ViewMore.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface ViewMoreProps {
  link: string;
}

const ViewMore = ({
  link,
}: ViewMoreProps): JSX.Element => {
  const history: History = useHistory();

  return (
    <div
      className={cx('ViewMore')}
      onClick={() => history.push(link)}
    >
      더보기
    </div>
  );
};

export default ViewMore;
