import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { APP_NAME } from 'util/constants';

const style = require('./PopularTitle.scss');
const cx: ClassNamesFn = classNames.bind(style);

const PopularTitle = (): JSX.Element => {
  return (
    <div className={cx('PopularTitle')}>
      {APP_NAME}의 인기 질문글
    </div>
  );
};

export default PopularTitle;
