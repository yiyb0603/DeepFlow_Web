import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { RecentPostItemProps } from '../RecentPostItem/RecentPostItem';

const style = require('./RecentPostGridItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface RecentPostGridItemProps extends RecentPostItemProps {
  introduction: string;
}

const RecentPostGridItem = ({ 
  title,
  introduction,
  thumbnail,
  createdAt,
  viewCount,
  likeCount,
  commentCount,
  tags,
 }: RecentPostGridItemProps) => {
  return (
    <div className={cx('RecentPostGridItem')}>
      <div className={cx('RecentPostGridItem-ImageWrap')}>
        <img src={thumbnail} className={cx('RecentPostGridItem-ImageWrap-Thumbnail')} alt='thumbnail' />
      </div>

      <div className={cx('RecentPostGridItem-Contents')}>
        <div className={cx('RecentPostGridItem-Contents-Title')}>
          {title}
        </div>
        
        <div className={cx('RecentPostGridItem-Contents-Introduction')}>
          {introduction}
        </div>

        <div className={cx('RecentPostGridItem-Contents-Tags')}>
          {
            tags.map((tag: string, idx: number) => (
              <div
                key={idx}
                className={cx('RecentPostGridItem-Contents-Tags-Tag')}
              >
                {tag}
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default RecentPostGridItem;
