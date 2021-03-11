import React, { CSSProperties, useCallback, useState } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import RecentPostItem from './RecentPostItem';
import Sample from 'assets/images/sample.png';
import { EView } from 'lib/enum/theme';
import RecentPostGridItem from './RecentPostGridItem';

const style = require('./RecentPost.scss');
const cx: ClassNamesFn = classNames.bind(style);

const dummys = [
  {
    title: '테스트테스트테스트123123',
    thumbnail: Sample,
    createdAt: '2021-03-02',
    viewCount: 10,
    commentCount: 2,
    likeCount: 5,
    tags: ['React', 'Vue', 'Angular', 'TypeScript'],
  },

  {
    title: '테스트테스트테스트456456',
    thumbnail: Sample,
    createdAt: '2021-03-02',
    viewCount: 10,
    commentCount: 2,
    likeCount: 5,
    tags: ['React', 'Vue', 'Angular', 'TypeScript'],
  },

  {
    title: '테스트테스트테스트789789',
    thumbnail: Sample,
    createdAt: '2021-03-02',
    viewCount: 10,
    commentCount: 2,
    likeCount: 5,
    tags: ['React', 'Vue', 'Angular', 'TypeScript'],
  },

  {
    title: '테스트테스트테스트789789',
    thumbnail: Sample,
    createdAt: '2021-03-02',
    viewCount: 10,
    commentCount: 2,
    likeCount: 5,
    tags: ['React', 'Vue', 'Angular', 'TypeScript'],
  },

  {
    title: '테스트테스트테스트789789',
    thumbnail: Sample,
    createdAt: '2021-03-02',
    viewCount: 10,
    commentCount: 2,
    likeCount: 5,
    tags: ['React', 'Vue', 'Angular', 'TypeScript'],
  },
];

const RecentPost = (): JSX.Element => {
  const { LIST, GRID } = EView;
  const [viewMode, setViewMode] = useState<EView>(GRID);

  const flexStyle: CSSProperties = {
    flexDirection: viewMode === LIST ? 'column' : 'row',
  }

  const onChangeViewMode = useCallback((type: EView) => {
    if (type === viewMode) {
      return;
    }

    setViewMode(type);
  }, [viewMode]);

  return (
    <div className={cx('RecentPost')}>
      <div className={cx('RecentPost-Select')}>
        <AiOutlineUnorderedList
          className={cx('RecentPost-Select-Item', {
            'RecentPost-Select-Item-Current': viewMode === LIST,
          })}
          onClick={() => onChangeViewMode(LIST)}
        />
        
        <BsFillGrid3X3GapFill
          className={cx('RecentPost-Select-Item', {
            'RecentPost-Select-Item-Current': viewMode === GRID,
          })}
          onClick={() => onChangeViewMode(GRID)}
        />
      </div>
      <div className={cx('RecentPost-List')} style={flexStyle}>
      {
        dummys.map((dummy, idx: number) => {
          const { title, thumbnail, createdAt, viewCount, commentCount, likeCount, tags } = dummy;
          return (
            <>
              {
                viewMode === LIST ?
                <RecentPostItem
                  key={idx}
                  title={title}
                  thumbnail={thumbnail}
                  createdAt={createdAt}
                  viewCount={viewCount}
                  commentCount={commentCount}
                  likeCount={likeCount}
                  tags={tags}
                /> :
                
                <RecentPostGridItem
                  key={idx}
                  title={title}
                  introduction='안녕안녕 123423432432423423ㅇ날안녕안녕'
                  thumbnail={thumbnail}
                  createdAt={createdAt}
                  viewCount={viewCount}
                  commentCount={commentCount}
                  likeCount={likeCount}
                  tags={tags}
                />
              }
            </>
          );
        })
      }
      </div>
    </div>
  );
};

export default RecentPost;
