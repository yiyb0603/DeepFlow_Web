import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { EView } from 'lib/enum/theme';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';

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
      
      <BsFillGrid3X3GapFill
        className={cx('SelectViewMode-Item', {
          'SelectViewMode-Item-Current': viewMode === GRID,
        })}
        onClick={() => onChangeViewMode(GRID)}
      />
    </div>
  );
};

export default SelectViewMode;
