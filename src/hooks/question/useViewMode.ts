import { useState, useCallback, CSSProperties } from 'react';
import { EView } from 'lib/enum/theme';

const useViewMode = () => {
  const { LIST } = EView;
  const [viewMode, setViewMode] = useState<EView>(LIST);

  const flexStyle: CSSProperties = {
    display: 'flex',
    flexDirection: viewMode === LIST ? 'column' : 'row',
    flexWrap: 'wrap',
  };

  const onChangeViewMode = useCallback((type: EView) => {
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