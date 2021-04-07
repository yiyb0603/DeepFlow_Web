import { ReactNode } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import SelectNavbar from './SelectNavbar';

const style = require('./UserTemplate.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface UserTemplateProps {
  children?: ReactNode;
}

const UserTemplate = ({
  children,
}: UserTemplateProps): JSX.Element => {
  return (
    <div className={cx('UserTemplate')}>
      <SelectNavbar />
      {children}
    </div>
  );
}

export default UserTemplate;