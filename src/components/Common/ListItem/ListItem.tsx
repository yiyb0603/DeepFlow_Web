import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import React from 'react';
import { AiOutlineEye } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';
import { FiClock } from 'react-icons/fi';

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
        </div>

        <div className={cx('ListItem-Contents-ContentsWrap')}>
          <div className={cx('ListItem-Contents-ContentsWrap-Top')}>
            <div>yiyb0603</div>

            {
              viewCount && likeCount && commentCount ?
              <div className={cx('ListItem-Contents-ContentsWrap-Top-RightInfo')}>
                <div className={cx('ListItem-Contents-ContentsWrap-Top-RightInfo-InfoWrap')}>
                  <FiClock className={cx('ListItem-Contents-ContentsWrap-Top-RightInfo-InfoWrap-Icon')} />
                  <div>3분전</div>
                </div>

                <div className={cx('ListItem-Contents-ContentsWrap-Top-RightInfo-InfoWrap')}>
                  <AiOutlineEye className={cx('ListItem-Contents-ContentsWrap-Top-RightInfo-InfoWrap-Icon')} />
                  <div>3분전</div>
                </div>

                <div className={cx('ListItem-Contents-ContentsWrap-Top-RightInfo-InfoWrap')}>
                  <BiCommentDetail className={cx('ListItem-Contents-ContentsWrap-Top-RightInfo-InfoWrap-Icon')} />
                  <div>3분전</div>
                </div>
              </div> : <></>
            }
          </div>

          <div className={cx('ListItem-Contents-ContentsWrap-Title')}>
            {title}
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
