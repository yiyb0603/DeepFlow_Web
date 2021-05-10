import { historySingleton } from 'lib/singleton/history';
import { useCallback, useState } from 'react';
import useQueryString from './useQueryString';

const useTabState = <T>(queryKey: string, defaultValue: any) => {
  const query = useQueryString();
  const [selectTab, setSelectTab] = useState<T>(query[queryKey] || defaultValue);

  const onChangeSelectTab = useCallback((selectTab: T): void => {
    historySingleton.push(`?${queryKey}=${selectTab}`);
    setSelectTab(selectTab);
  }, [queryKey]);

  return [
    selectTab,
    onChangeSelectTab,
  ] as const;
}

export default useTabState;