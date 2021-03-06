import { memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import NoPost from 'assets/images/no-post.svg';

const style = require('./NoItems.scss');
const cx: ClassNamesFn = classNames.bind(style);

export interface NoItemsProps {
  text: string;
  imageWidth?: string;
}

const NoItems = ({
  text,
  imageWidth = '45%',
}: NoItemsProps): JSX.Element => {
  return (
    <div className={cx('NoItems')}>
      <img
        data-testid='no-items-image'
        src={NoPost}
        alt='noPost'
        className={cx('NoItems-Image')}
        style={{ width: imageWidth }}
      />
      <div
        data-testid='no-items-text'
        className={cx('NoItems-Text')}
      >
        {text}
      </div>
    </div>
  );
};

export default memo(NoItems);
