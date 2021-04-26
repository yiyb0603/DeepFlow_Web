import { useMemo, memo, CSSProperties } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./SelectTab.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface SelectTabProps {
  name: string;
  route: string;
  selectTab: any;
  onChangeSelectTab: (selectTab: any) => void;
  customStyle?: CSSProperties;
}

const SelectTab = ({
  name,
  route,
  selectTab,
  onChangeSelectTab,
  customStyle,
}: SelectTabProps): JSX.Element => {
  const splitedByRoute: string = useMemo(() => route.split('=')[1], [route]);

  return (
    <div
      className={cx('SelectTab', {
        'SelectTab-Current': String(selectTab) === splitedByRoute,
      })}
      onClick={() => onChangeSelectTab(splitedByRoute)}
      style={customStyle}
    >
      {name}
    </div>
  );
};

export default memo(SelectTab);
