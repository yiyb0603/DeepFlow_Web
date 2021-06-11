import { memo, ReactNode } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import ClearHistory from './ClearHistory';

const style = require('./SearchHistory.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface SearchHistoryProps {
  children: ReactNode;
}

const SearchHistory = ({
  children,
}: SearchHistoryProps): JSX.Element => {
  return (
    <div className={cx('SearchHistory')}>
      {children}
      <ClearHistory />
    </div>
  );
};

export default memo(SearchHistory);
