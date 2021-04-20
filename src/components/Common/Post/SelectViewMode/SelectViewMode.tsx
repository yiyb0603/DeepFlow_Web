import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { CgMenuGridO } from 'react-icons/cg';
import { EView } from 'lib/enum/theme';

const style = require('./SelectViewMode.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface SelectViewModeProps {
  viewMode: EView;
  onChangeViewMode: (viewMode: EView) => void;
}

const SelectViewMode = ({
  viewMode,
  onChangeViewMode,
}: SelectViewModeProps): JSX.Element => {
  const { LIST, GRID } = EView;

  return (
    <div className={cx('SelectViewMode')}>
      <AiOutlineUnorderedList
        className={cx('SelectViewMode-Item', {
          'SelectViewMode-Item-Current': viewMode === LIST,
        })}
        onClick={() => onChangeViewMode(LIST)}
      />
      
      <CgMenuGridO
        className={cx('SelectViewMode-Item', {
          'SelectViewMode-Item-Current': viewMode === GRID,
        })}
        onClick={() => onChangeViewMode(GRID)}
      />
    </div>
  );
};

export default SelectViewMode;
