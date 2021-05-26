import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { CgMenuGridO } from 'react-icons/cg';
import { EView } from 'lib/enum/theme';
import { CSSProperties, useMemo } from 'react';

const style = require('./SelectViewMode.scss');
const cx: ClassNamesFn = classNames.bind(style);

export interface SelectViewModeProps {
  viewMode: EView;
  onChangeViewMode: (viewMode: EView) => void;
  margin?: string;
}

const SelectViewMode = ({
  viewMode,
  onChangeViewMode,
  margin = '0 0 0 0',
}: SelectViewModeProps): JSX.Element => {
  const { LIST, GRID } = EView;

  const viewModeStyle: CSSProperties = useMemo(() => {
    return {
      margin,
    };
  }, [margin]);

  return (
    <div
      className={cx('SelectViewMode')}
      style={viewModeStyle}
    >
      <AiOutlineUnorderedList
        data-testid='view-mode-click'
        className={cx('SelectViewMode-Item', {
          'SelectViewMode-Item-Current': viewMode === LIST,
        })}
        onClick={() => onChangeViewMode(LIST)}
      />
      
      <CgMenuGridO
        data-testid='view-mode-click'
        className={cx('SelectViewMode-Item', {
          'SelectViewMode-Item-Current': viewMode === GRID,
        })}
        onClick={() => onChangeViewMode(GRID)}
      />
    </div>
  );
};

export default SelectViewMode;
