import { useCallback, useMemo, useState } from 'react';
import { historySingleton } from 'lib/singleton/history';
import getQueryString from 'util/getQueryString';

const useTabState = <T>(queryKey: string, defaultValue: any) => {
  const query = useMemo(() => getQueryString(queryKey), [queryKey]);
  const [selectTab, setSelectTab] = useState<T>(query || defaultValue);

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