import React from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { FiClock } from 'react-icons/fi';
import { AiOutlineEye } from 'react-icons/ai';
import { BiCommentDetail } from 'react-icons/bi';

const style = require('./RecentPostItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

export interface RecentPostItemProps {
  title: string;
  thumbnail: string;
  createdAt: Date | string;
  viewCount: number;
  commentCount: number;
  likeCount: number;
  tags: string[];
};

const RecentPostItem = ({
  title,
  thumbnail,
  createdAt,
  viewCount,
  commentCount,
  likeCount,
  tags,
} : RecentPostItemProps): JSX.Element => {
  return (
    <div className={cx('RecentPostItem')}>
      <div className={cx('RecentPostItem-Contents')}>
        <div className={cx('RecentPostItem-Contents-ImageWrap')}>
          <img
            src={thumbnail}
            className={cx('RecentPostItem-Contents-ImageWrap-Thumbnail')}
            alt='thumbnail'
          />
        </div>

        <div className={cx('RecentPostItem-Contents-ContentsWrap')}>
          <div className={cx('RecentPostItem-Contents-ContentsWrap-Top')}>
            <div>yiyb0603</div>

            <div className={cx('RecentPostItem-Contents-ContentsWrap-Top-RightInfo')}>
              <div className={cx('RecentPostItem-Contents-ContentsWrap-Top-RightInfo-InfoWrap')}>
                <FiClock className={cx('RecentPostItem-Contents-ContentsWrap-Top-RightInfo-InfoWrap-Icon')} />
                <div>3분전</div>
              </div>

              <div className={cx('RecentPostItem-Contents-ContentsWrap-Top-RightInfo-InfoWrap')}>
                <AiOutlineEye className={cx('RecentPostItem-Contents-ContentsWrap-Top-RightInfo-InfoWrap-Icon')} />
                <div>3분전</div>
              </div>

              <div className={cx('RecentPostItem-Contents-ContentsWrap-Top-RightInfo-InfoWrap')}>
                <BiCommentDetail className={cx('RecentPostItem-Contents-ContentsWrap-Top-RightInfo-InfoWrap-Icon')} />
                <div>3분전</div>
              </div>
            </div>
          </div>

          <div className={cx('RecentPostItem-Contents-ContentsWrap-Title')}>
            {title}
          </div>

          <div className={cx('RecentPostItem-Contents-ContentsWrap-Tags')}>
            {
              tags.map((tag: string, idx: number) => (
                <div
                  className={cx('RecentPostItem-Contents-ContentsWrap-Tags-Tag')}
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

export default RecentPostItem;
