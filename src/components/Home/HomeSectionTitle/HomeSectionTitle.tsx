import { ReactNode } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./HomeSectionTitle.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface HomeSectionTitleProps {
  title: string;
  children?: ReactNode;
}

const HomeSectionTitle = ({
  title,
  children,
}: HomeSectionTitleProps) => {
  return (
    <div className={cx('HomeSectionTitle')}>
      {title}

      {children && children}
    </div>
  );
};

export default HomeSectionTitle;
