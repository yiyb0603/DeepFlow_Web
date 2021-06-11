import { ReactNode } from 'react';
import FadeIn from 'react-fade-in';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import SelectNavbar from './SelectNavbar';

const style = require('./UserTemplate.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface UserTemplateProps {
  children: ReactNode;
}

const UserTemplate = ({
  children,
}: UserTemplateProps): JSX.Element => {
  return (
    <FadeIn>
      <div className={cx('UserTemplate')}>
        <SelectNavbar />
        {children}
      </div>
    </FadeIn>
  );
}

export default UserTemplate;