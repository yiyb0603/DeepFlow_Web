import { useCallback, useEffect, useMemo, memo, useRef, ChangeEvent, KeyboardEvent } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { AiOutlineSearch } from 'react-icons/ai';
import { searchKeywordListState, searchKeywordState, showSearchHistoryState } from 'atom/search';
import { ISearchKeyword } from 'types/search.types';
import { EPost } from 'lib/enum/post';
import CategorySelect from 'components/Common/Post/CategorySelect';
import SearchHistory from '../SearchHistory';
import HistoryItem from '../SearchHistory/HistoryItem';

const style = require('./SearchBar.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface SearchBarProps {
  handlePushToSearch: (keyword: string, category: EPost) => void;
  onKeydownKeyword: (e: KeyboardEvent<HTMLInputElement>) => void;
  keywordState: {
    keyword: string;
    onChangeKeyword: (e: ChangeEvent<HTMLInputElement>) => void;
  };

  categoryState: {
    category: EPost;
    onChangeCategory: (category: EPost) => void;
  };
}

const SearchBar = ({
  handlePushToSearch,
  onKeydownKeyword,
  keywordState,
  categoryState,
}: SearchBarProps): JSX.Element => {
  const searchZoneRef = useRef<HTMLDivElement | null>(null);
  
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
        <div className={cx('SearchBar-SearchWrap-Search')} >
          <AiOutlineSearch className={cx('SearchBar-SearchWrap-Search-Icon')} />
          <input
            type='text'
            className={cx('SearchBar-SearchWrap-Search-Input')}
            value={keywordState.keyword}
            onChange={keywordState.onChangeKeyword}
            onKeyDown={onKeydownKeyword}
            onClick={() => setIsShowHistory(true)}
            placeholder='검색어를 입력하세요'
          />
        </div>

        {
          isShowHistory &&
          filterKeywords.length > 0 &&
          <SearchHistory>
            {
              filterKeywords.map(({ idx, keyword, category }) => (
                <HistoryItem
                  key={idx}
                  idx={idx}
                  keyword={keyword}
                  category={category}
                  handlePushToSearch={handlePushToSearch}
                />
              ))
            }
          </SearchHistory>
        }
      </div>
      
      <CategorySelect onChangeCategory={categoryState.onChangeCategory} />
    </div>
  );
};

export default memo(SearchBar);
