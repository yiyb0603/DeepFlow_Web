import { ReactNode } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./PreviewTab.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface PreviewTabProps {
  children?: ReactNode;
}

const PreviewTab = ({
  children,
}: PreviewTabProps): JSX.Element => {
  return (
    <div className={cx('PreviewTab')}>
      {children}
    </div>
  );
};

export default PreviewTab;
