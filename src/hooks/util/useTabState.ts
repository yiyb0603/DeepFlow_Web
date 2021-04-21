import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import useQueryString from './useQueryString';

const useTabState = (queryKey: string, defaultValue: any) => {
  const query = useQueryString();
  const history: History = useHistory();
  const [selectTab, setSelectTab] = useState(query[queryKey] || defaultValue);

  const onChangeSelectTab = useCallback((selectTab): void => {
    history.push(`?${queryKey}=${selectTab}`);
    setSelectTab(selectTab);
  }, [history, queryKey]);

  return [
    selectTab,
    onChangeSelectTab,
  ];
}

export default useTabState;