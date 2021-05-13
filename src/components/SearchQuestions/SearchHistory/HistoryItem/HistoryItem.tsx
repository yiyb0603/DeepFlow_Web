import { useCallback, memo, MouseEvent } from 'react';
import { useRecoilState } from 'recoil';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { VscChromeClose } from 'react-icons/vsc';
import { searchKeywordListState } from 'lib/recoil/atom/search';
import Storage from 'lib/Storage';
import { ISearchKeyword } from 'types/search.types';

const style = require('./HistoryItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface HistoryItemProps {
  idx: number;
  keyword: string;
  handlePushToSearch: (keyword: string) => void;
}

const HistoryItem = ({
  idx,
  keyword,
  handlePushToSearch,
}: HistoryItemProps): JSX.Element => {
  const [searchKeywords, setSearchKeywords] = useRecoilState<ISearchKeyword[]>(searchKeywordListState);

  const onDelete = useCallback((e: MouseEvent<SVGElement>): void => {
    e.stopPropagation();

    const filteredKeywords: ISearchKeyword[] = searchKeywords.filter((keyword: ISearchKeyword) => keyword.idx !== idx);
    setSearchKeywords(filteredKeywords);
    Storage.setStorage('keywords', JSON.stringify(filteredKeywords));
  }, [idx, searchKeywords, setSearchKeywords]);

  return (
    <div
      className={cx('HistoryItem')}
      onClick={() => handlePushToSearch(keyword)}
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
