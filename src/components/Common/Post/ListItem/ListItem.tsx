import { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { isNullOrUndefined } from 'util/isNullOrUndefined';
import { IUser } from 'types/user.types';
import TimeSticker from '../TimeSticker';
import PostSubInfo from '../PostSubInfo';
import Sample from 'assets/images/sample.png';

const style = require('./ListItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

export interface ItemProps {
  idx: number;
  title: string;
  introduction: string;
  thumbnail: string | null;
  createdAt: Date | string;
  updatedAt: Date | string | null;
  viewCount?: number;
  likeCount?: number;
  commentCount?: number;
  postTags?: string[];
  user?: IUser;
  isTemp?: boolean;
}

const ListItem = ({
  idx,
  title,
  introduction,
  thumbnail,
  createdAt,
  updatedAt,
  viewCount,
  likeCount,
  commentCount,
  postTags,
  user,
  isTemp,
}: ItemProps): JSX.Element => {
  const postLink: string = useMemo(() => isTemp ? `/post-form/${idx}` : `/post/${idx}`, [idx, isTemp]);

  return (
    <Link to={postLink} className={cx('ListItem')}>
      <div className={cx('ListItem-Contents')}>
        <div className={cx('ListItem-Contents-ImageWrap')}>
          <img
            src={thumbnail || Sample}
            className={cx('ListItem-Contents-ImageWrap-Thumbnail')}
            alt='thumbnail'
          />

          <TimeSticker createdAt={createdAt} updatedAt={updatedAt} />
        </div>

        <div className={cx('ListItem-Contents-ContentsWrap')}>
          <div className={cx('ListItem-Contents-ContentsWrap-Top')}>
            {
              user &&
              <div className={cx('ListItem-Contents-ContentsWrap-Top-Writer')}>
                작성자: {user.name}
              </div>
            }

            <div className={cx('ListItem-Contents-ContentsWrap-Top-RightInfo')}>
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
            </div>
          </div>

          <div className={cx('ListItem-Contents-ContentsWrap-Title')}>
            제목: {title}
          </div>

          <div className={cx('ListItem-Contents-ContentsWrap-Introduction')}>
            <div>{introduction}</div>
          </div>

          <div className={cx('ListItem-Contents-ContentsWrap-Tags')}>
            {
              postTags && postTags.map((tag: string, idx: number) => (
                <div
                  className={cx('ListItem-Contents-ContentsWrap-Tags-Tag')}
                  key={idx}
                >
                  {tag}
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </Link>
  );
};

export default memo(ListItem);
