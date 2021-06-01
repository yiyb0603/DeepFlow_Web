import { useCallback, useEffect, useMemo, memo, useRef, ChangeEvent, KeyboardEvent } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { searchKeywordListState, searchKeywordState, showSearchHistoryState } from 'lib/recoil/atom/search';
import { ISearchKeyword } from 'types/search.types';
import SearchInput from 'components/Common/Input/SearchInput';
import SearchHistory from '../SearchHistory';
import HistoryItem from '../SearchHistory/HistoryItem';

const style = require('./SearchBar.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface SearchBarProps {
  handlePushToSearch: (keyword: string) => void;
  onKeydownKeyword: (e: KeyboardEvent<HTMLInputElement>) => void;

  keyword: string;
  onChangeKeyword: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({
  handlePushToSearch,
  onKeydownKeyword,
  keyword,
  onChangeKeyword,
}: SearchBarProps): JSX.Element => {
  const searchZoneRef = useRef<HTMLDivElement>(null);
  
  const searchKeyword: string = useRecoilValue<string>(searchKeywordState);
  const [isShowHistory, setIsShowHistory] = useRecoilState(showSearchHistoryState);
  const searchKeywordList: ISearchKeyword[] = useRecoilValue<ISearchKeyword[]>(searchKeywordListState);

  const filterKeywords: ISearchKeyword[] = useMemo(() => {
    return searchKeywordList.filter(({ keyword }) => keyword.includes(searchKeyword))
  }, [searchKeyword, searchKeywordList]);

  const handleClickOut = useCallback((e) => {
    if (searchZoneRef.current && !searchZoneRef.current.contains(e.target)) {
      setIsShowHistory(false);
    }
  }, [setIsShowHistory]);

  useEffect(() => {
    document.addEventListener('click', handleClickOut, true);

    return () => document.removeEventListener('click', handleClickOut, true);
  }, [handleClickOut]);

  return (
    <div className={cx('SearchBar')}>
      <div className={cx('SearchBar-SearchWrap')} ref={searchZoneRef}>
        <SearchInput
          value={keyword}
          onChangeValue={onChangeKeyword}
          onKeydown={onKeydownKeyword}
          onClick={() => setIsShowHistory(true)}
          placeholder='검색어를 입력하세요'
          isBorder={false}
          fontSize='1.35rem'
        />

        {
          isShowHistory &&
          filterKeywords.length > 0 &&
          <SearchHistory>
            {
              filterKeywords.map(({ idx, keyword }) => (
                <HistoryItem
                  key={idx}
                  idx={idx}
                  keyword={keyword}
                  handlePushToSearch={handlePushToSearch}
                />
              ))
            }
          </SearchHistory>
        }
      </div>
    </div>
  );
};

export default memo(SearchBar);
