import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { calculateTime } from 'lib/TimeCounting';
import { ItemProps } from '../ListItem/ListItem';
import TimeSticker from '../TimeSticker';
import PostSubInfo from '../PostSubInfo';
import { isNullOrUndefined } from 'converter/isNullOrUndefined';

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
  user,
}: ItemProps): JSX.Element => {
  return (
    <div className={cx('GridItem')}>
      <div className={cx('GridItem-ImageWrap')}>
        <img src={thumbnail || ''} className={cx('GridItem-ImageWrap-Thumbnail')} alt='thumbnail' />
        <TimeSticker text={calculateTime(createdAt)} />
      </div>

      <div className={cx('GridItem-Contents')}>
        <div className={cx('GridItem-Contents-Title')}>
          제목: {title}
        </div>
        
        <div className={cx('GridItem-Contents-Introduction')}>
          <div>{introduction}</div>
        </div>

        <div className={cx('GridItem-Contents-Info')}>
          {
            !isNullOrUndefined(viewCount) &&
            !isNullOrUndefined(likeCount) &&
            !isNullOrUndefined(commentCount) ?
            <PostSubInfo
              viewCount={viewCount!}
              likeCount={likeCount!}
              commentCount={commentCount!}
            /> : <></>
          }

          <div className={cx('GridItem-Contents-Info-UserInfo')}>
            <div>{user?.name}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GridItem;
