import { memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./SectionTitle.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface SectionTitleProps {
  title: string;
}

const SectionTitle = ({
  title,
}: SectionTitleProps): JSX.Element => {
  return (
    <div className={cx('SectionTitle')}>{title}</div>
  );
};

export default memo(SectionTitle);