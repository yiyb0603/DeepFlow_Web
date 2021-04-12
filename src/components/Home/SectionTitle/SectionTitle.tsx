import { ReactNode } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./SectionTitle.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface SectionTitleProps {
  title: string;
  children?: ReactNode;
}

const SectionTitle = ({
  title,
  children,
}: SectionTitleProps) => {
  return (
    <div className={cx('SectionTitle')}>
      {title}

      {children}
    </div>
  );
};

export default SectionTitle;
