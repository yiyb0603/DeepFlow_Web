import { CSSProperties, useCallback, useState } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import Sample from 'assets/images/sample.png';
import { EView } from 'lib/enum/theme';
import { IPost } from 'types/post.types';
import GridItem from 'components/Common/GridItem';
import ListItem from 'components/Common/ListItem';

const style = require('./RecentPost.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface RecentPostProps {
  recentPosts: IPost[];
}

const RecentPost = ({ recentPosts }: RecentPostProps): JSX.Element => {
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
        recentPosts.map((post: IPost) => {
          const { idx, title, thumbnail, introduction, createdAt, viewCount, commentCount, likeCount, postTags } = post;
          return (
            <>
              {
                viewMode === LIST ?
                <ListItem
                  key={idx}
                  idx={idx}
                  title={title}
                  introduction={introduction}
                  thumbnail={thumbnail || Sample}
                  createdAt={createdAt}
                  viewCount={viewCount}
                  commentCount={commentCount}
                  likeCount={likeCount}
                  postTags={postTags}
                /> :
                
                <GridItem
                  key={idx}
                  idx={idx}
                  title={title}
                  introduction='안녕안녕 123423432432423423ㅇ날안녕안녕'
                  thumbnail={thumbnail}
                  createdAt={createdAt}
                  viewCount={viewCount}
                  commentCount={commentCount}
                  likeCount={likeCount}
                  postTags={postTags}
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
