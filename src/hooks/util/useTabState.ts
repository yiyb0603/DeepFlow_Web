import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import useQueryString from './useQueryString';

const useTabState = <T>(queryKey: string, defaultValue: any) => {
  const query = useQueryString();
  const history: History = useHistory();
  const [selectTab, setSelectTab] = useState<T>(query[queryKey] || defaultValue);

  const onChangeSelectTab = useCallback((selectTab: T): void => {
    history.push(`?${queryKey}=${selectTab}`);
    setSelectTab(selectTab);
  }, [history, queryKey]);

  return [
    selectTab,
    onChangeSelectTab,
  ] as const;
}

export default useTabState;