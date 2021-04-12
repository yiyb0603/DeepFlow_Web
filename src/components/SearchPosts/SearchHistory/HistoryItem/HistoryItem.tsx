import { useCallback, memo, MouseEvent } from 'react';
import { useRecoilState } from 'recoil';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { VscChromeClose } from 'react-icons/vsc';
import { searchKeywordListState } from 'atom/search';
import { setStorage } from 'lib/Storage';
import { ISearchKeyword } from 'types/search.types';
import { EPost } from 'lib/enum/post';

const style = require('./HistoryItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface HistoryItemProps {
  idx: number;
  keyword: string;
  category: EPost;
  handlePushToSearch: (keyword: string, category: EPost) => void;
}

const HistoryItem = ({
  idx,
  keyword,
  category,
  handlePushToSearch,
}: HistoryItemProps): JSX.Element => {
  const [searchKeywords, setSearchKeywords] = useRecoilState<ISearchKeyword[]>(searchKeywordListState);

  const onDelete = useCallback((e: MouseEvent<SVGElement>): void => {
    e.stopPropagation();

    const filteredKeywords: ISearchKeyword[] = searchKeywords.filter((keyword: ISearchKeyword) => keyword.idx !== idx);
    setSearchKeywords(filteredKeywords);
    setStorage('keywords', JSON.stringify(filteredKeywords));
  }, [idx, searchKeywords, setSearchKeywords]);

  return (
    <div
      className={cx('HistoryItem')}
      onClick={() => handlePushToSearch(keyword, category)}
    >
      <div className={cx('HistoryItem-Keyword')}>{keyword}</div>
      <VscChromeClose
        className={cx('HistoryItem-Delete')}
        onClick={onDelete}
      />
    </div>
  );
};

export default memo(HistoryItem);
