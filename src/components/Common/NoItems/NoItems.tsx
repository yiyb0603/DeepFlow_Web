import { memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { ReactComponent as NoPost } from 'assets/images/no-post.svg';

const style = require('./NoItems.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface NoItemsProps {
  text: string;
  imageWidth?: string;
}

const NoItems = ({
  text,
  imageWidth = '45%',
}: NoItemsProps): JSX.Element => {
  return (
    <div className={cx('NoItems')}>
      <NoPost
        className={cx('NoItems-Image')}
        style={{ width: imageWidth }}
      />
      <div className={cx('NoItems-Text')}>{text}</div>
    </div>
  );
};

export default memo(NoItems);
