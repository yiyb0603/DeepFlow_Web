import { useCallback, MouseEvent } from 'react';
import { useRecoilState } from 'recoil';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { VscChromeClose } from 'react-icons/vsc';
import { searchKeywordState } from 'atom/search';
import { setStorage } from 'lib/Storage';
import { ISearchKeyword } from 'types/search.types';

const style = require('./HistoryItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

const HistoryItem = ({
  idx,
  keyword,
}: ISearchKeyword): JSX.Element => {
  const [searchKeywords, setSearchKeywords] = useRecoilState<ISearchKeyword[]>(searchKeywordState);

  const onDelete = useCallback((e: MouseEvent<SVGElement>): void => {
    e.stopPropagation();

    const filteredKeywords: ISearchKeyword[] = searchKeywords.filter((keyword: ISearchKeyword) => keyword.idx !== idx);

    setSearchKeywords(filteredKeywords);
    setStorage('keywords', JSON.stringify(filteredKeywords));
  }, [idx, searchKeywords, setSearchKeywords]);

  return (
    <div className={cx('HistoryItem')}>
      <div className={cx('HistoryItem-Keyword')}>{keyword}</div>
      <VscChromeClose
        className={cx('HistoryItem-Delete')}
        onClick={onDelete}
      />
    </div>
  );
};

export default HistoryItem;
