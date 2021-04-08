import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { AiOutlineSearch } from 'react-icons/ai';
import { EPost } from 'lib/enum/post';
import CategorySelect from 'components/Common/Post/CategorySelect';
import SearchHistory from '../SearchHistory';
import { showSearchHistoryState } from 'atom/search';

const style = require('./SearchBar.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface SearchBarProps {
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
  onKeydownKeyword,
  keywordState,
  categoryState,
}: SearchBarProps): JSX.Element => {
  const searchZoneRef = useRef<HTMLDivElement | null>(null);
  const [isShowHistory, setIsShowHistory] = useRecoilState(showSearchHistoryState);

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
          <SearchHistory />
        }
      </div>
      
      <CategorySelect onChangeCategory={categoryState.onChangeCategory} />
    </div>
  );
};

export default SearchBar;
