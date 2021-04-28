import { memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./GenerationTitle.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface GenerationTitleProps {
  text: string;
}

const GenerationTitle = ({
  text,
}: GenerationTitleProps): JSX.Element => {
  return (
    <div className={cx('GenerationTitle')}>{text}</div>
  );
};

export default memo(GenerationTitle);