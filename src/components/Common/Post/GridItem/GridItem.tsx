import { memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { Link } from 'react-router-dom';
import { ItemProps } from '../ListItem/ListItem';
import TimeSticker from '../TimeSticker';
import PostSubInfo from '../PostSubInfo';
import { isNullOrUndefined } from 'util/isNullOrUndefined';
import Sample from 'assets/images/sample.png';

const style = require('./GridItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

const GridItem = ({
  idx,
  title,
  introduction,
  thumbnail,
  postTags,
  createdAt,
  updatedAt,
  viewCount,
  commentCount,
  replyCount,
  likeCount,
  user,
}: ItemProps): JSX.Element => {
  return (
    <Link to={`/question/${idx}`} className={cx('GridItem')}>
      <div className={cx('GridItem-ImageWrap')}>
        <img src={thumbnail || Sample} className={cx('GridItem-ImageWrap-Thumbnail')} alt='thumbnail' />
        <TimeSticker createdAt={createdAt} updatedAt={updatedAt} />
      </div>

      <div className={cx('GridItem-Contents')}>
        <div className={cx('GridItem-Contents-Title')}>
          {title}
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
              commentCount={commentCount! + replyCount!}
            /> : <></>
          }

          <div className={cx('GridItem-Contents-Info-UserInfo')}>
            <div>{user?.name}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default memo(GridItem);
