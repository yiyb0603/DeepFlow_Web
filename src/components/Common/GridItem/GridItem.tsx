import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { ItemProps } from '../ListItem/ListItem';

const style = require('./GridItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

const GridItem = ({
  idx,
  title,
  introduction,
  thumbnail,
  postTags,
  createdAt,
  viewCount,
  commentCount,
  likeCount,
}: ItemProps): JSX.Element => {
  return (
    <div className={cx('GridItem')}>
      <div className={cx('GridItem-ImageWrap')}>
        <img src={thumbnail || ''} className={cx('GridItem-ImageWrap-Thumbnail')} alt='thumbnail' />
      </div>

      <div className={cx('GridItem-Contents')}>
        <div className={cx('GridItem-Contents-Title')}>
          {title}
        </div>
        
        <div className={cx('GridItem-Contents-Introduction')}>
          {introduction}
        </div>

        <div className={cx('GridItem-Contents-Tags')}>
          {
            postTags && postTags.map((tag: string, idx: number) => (
              <div
                key={idx}
                className={cx('GridItem-Contents-Tags-Tag')}
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

export default GridItem;
