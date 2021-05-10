import { memo, useCallback } from 'react';
import { SetterOrUpdater, useSetRecoilState } from 'recoil';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { searchKeywordListState } from 'atom/search';
import { ISearchKeyword } from 'types/search.types';
import Storage from 'lib/Storage';

const style = require('./ClearHistory.scss');
const cx: ClassNamesFn = classNames.bind(style);

const ClearHistory = (): JSX.Element => {
  const setSearchKeywordList: SetterOrUpdater<ISearchKeyword[]> = useSetRecoilState<ISearchKeyword[]>(searchKeywordListState);

  const onClearKeywordList = useCallback((): void => {
    Storage.removeStorage('keywords');
    setSearchKeywordList([]);
  }, [setSearchKeywordList]);

  return (
    <div
      className={cx('ClearHistory')}
      onClick={onClearKeywordList}
    >
      전체 삭제
    </div>
  );
};

export default memo(ClearHistory);
