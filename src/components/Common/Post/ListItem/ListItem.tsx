import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { isNullOrUndefined } from 'converter/isNullOrUndefined';
import { calculateTime } from 'lib/TimeCounting';
import { IUser } from 'types/user.types';
import TimeSticker from '../TimeSticker';
import PostSubInfo from '../PostSubInfo';

const style = require('./ListItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

export interface ItemProps {
  idx: number;
  title: string;
  introduction: string;
  thumbnail: string | null;
  createdAt: Date | string;
  viewCount?: number;
  likeCount?: number;
  commentCount?: number;
  postTags?: string[];
  user?: IUser;
}

const ListItem = ({
  idx,
  title,
  introduction,
  thumbnail,
  createdAt,
  viewCount,
  likeCount,
  commentCount,
  postTags,
  user,
}: ItemProps): JSX.Element => {
  return (
    <div className={cx('ListItem')}>
      <div className={cx('ListItem-Contents')}>
        <div className={cx('ListItem-Contents-ImageWrap')}>
          <img
            src={thumbnail ?? ''}
            className={cx('ListItem-Contents-ImageWrap-Thumbnail')}
            alt='thumbnail'
          />

          <TimeSticker text={calculateTime(createdAt)} />
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
    </div>
  );
};

export default ListItem;
