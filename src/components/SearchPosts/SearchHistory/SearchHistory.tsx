import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { ISearchKeyword } from 'types/search.types';
import HistoryItem from './HistoryItem';
import { useRecoilValue } from 'recoil';
import { searchKeywordState } from 'atom/search';

const style = require('./SearchHistory.scss');
const cx: ClassNamesFn = classNames.bind(style);

const SearchHistory = (): JSX.Element => {
  const searchKeywords: ISearchKeyword[] = useRecoilValue<ISearchKeyword[]>(searchKeywordState);

  return (
    <div className={cx('SearchHistory')}>
      {
        Array.isArray(searchKeywords) && searchKeywords.map(({ idx, keyword }) => (
          <HistoryItem
            key={idx}
            idx={idx}
            keyword={keyword}
          />
        ))
      }
    </div>
  );
};

export default SearchHistory;
