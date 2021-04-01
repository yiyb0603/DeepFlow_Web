import { useMemo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./SelectTab.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface SelectTabProps {
  name: string;
  route: string;
  selectTab: number;
  onChangeSelectTab: (selectTab: number) => void;
}

const SelectTab = ({
  name,
  route,
  selectTab,
  onChangeSelectTab,
}: SelectTabProps): JSX.Element => {
  const splitedByRoute: number = useMemo(() => Number(route.split('=')[1]), [route]);

  return (
    <div
      className={cx('SelectTab', {
        'SelectTab-Current': selectTab === splitedByRoute,
      })}
      onClick={() => onChangeSelectTab(splitedByRoute)}
    >
      {name}
    </div>
  );
};

export default SelectTab;
