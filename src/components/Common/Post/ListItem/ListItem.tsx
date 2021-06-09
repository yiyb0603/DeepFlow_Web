import { useCallback, useMemo, memo, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import useTempQuestions from 'hooks/question/useTempQuestions';
import NoThumbnail from 'assets/images/no-thumbnail.jpg';
import isNullOrUndefined from 'util/isNullOrUndefined';
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
  updatedAt: Date | string | null;
  viewCount?: number;
  likeCount?: number;
  commentCount?: number;
  replyCount?: number;
  postTags?: string[];
  user?: IUser;
  isTemp?: boolean;
  requestDeleteQuestion?: (postIdx: number, isDetail?: boolean) => Promise<void>;
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
  replyCount,
  postTags,
  user,
  isTemp,
  requestDeleteQuestion,
}: ItemProps): JSX.Element => {
  const { requestTempQuestions } = useTempQuestions();
  const questionLink: string = useMemo(() => {
    return isTemp ? `/question-form/${idx}` : `/question/${idx}`;
  }, [idx, isTemp]);
  
  const onDelete = useCallback(async (e: MouseEvent<HTMLDivElement>): Promise<void> => {
    e.preventDefault();
    e.stopPropagation();

    await requestDeleteQuestion!(idx, false);
    await requestTempQuestions!();
  }, [idx, requestDeleteQuestion, requestTempQuestions]);

  return (
    <Link to={questionLink} className={cx('ListItem')}>
      <div className={cx('ListItem-Contents')}>
        <div className={cx('ListItem-Contents-ImageWrap')}>
          <img
            src={thumbnail || NoThumbnail}
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
                {user.name}
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
                  commentCount={commentCount! + replyCount!}
                /> : <></>
              }
            </div>
          </div>

          <div className={cx('ListItem-Contents-ContentsWrap-TitleWrap')}>
            <div className={cx('ListItem-Contents-ContentsWrap-TitleWrap-Title')}>
              {title}
            </div>
            
            {
              isTemp &&
              <div
                className={cx('ListItem-Contents-ContentsWrap-TitleWrap-Delete')}
                onClick={onDelete}
              >
                삭제
              </div>
            }
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
