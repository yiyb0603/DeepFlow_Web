import { useState, useCallback, CSSProperties, useMemo } from 'react';
import { EView } from 'lib/enum/theme';

const useViewMode = () => {
  const { LIST } = EView;
  const [viewMode, setViewMode] = useState<EView>(LIST);

  const flexStyle: CSSProperties = useMemo(() => {
    return {
      display: 'flex',
      flexDirection: viewMode === LIST ? 'column' : 'row',
      flexWrap: 'wrap',
    };
  }, [LIST, viewMode]);

  const onChangeViewMode = useCallback((type: EView): void => {
    if (type === viewMode) {
      return;
    }

    setViewMode(type);
  }, [viewMode]);

  return {
    viewMode,
    onChangeViewMode,
    flexStyle,
  };
}

export default useViewMode;