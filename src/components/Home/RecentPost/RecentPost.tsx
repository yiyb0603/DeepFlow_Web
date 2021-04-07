import { CSSProperties, memo, useCallback, useState } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import Sample from 'assets/images/sample.png';
import { EView } from 'lib/enum/theme';
import { IPost } from 'types/post.types';
import GridItem from 'components/Common/Post/GridItem';
import ListItem from 'components/Common/Post/ListItem';
import RecentPostTitle from './RecentPostTitle';
import NoItems from 'components/Common/NoItems';

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
      <div className={cx('RecentPost-Top')}>
        <RecentPostTitle />

        <div className={cx('RecentPost-Top-Select')}>
          <AiOutlineUnorderedList
            className={cx('RecentPost-Top-Select-Item', {
              'RecentPost-Top-Select-Item-Current': viewMode === LIST,
            })}
            onClick={() => onChangeViewMode(LIST)}
          />
          
          <BsFillGrid3X3GapFill
            className={cx('RecentPost-Top-Select-Item', {
              'RecentPost-Top-Select-Item-Current': viewMode === GRID,
            })}
            onClick={() => onChangeViewMode(GRID)}
          />
        </div>
      </div>
      <div className={cx('RecentPost-List')} style={flexStyle}>
      {
        recentPosts.length > 0 ? recentPosts.map((post: IPost) => {
          const { idx, thumbnail } = post;
          const postProps = {
            thumbnail: thumbnail || Sample,
            ...post,
          }

          return (
            <>
              {
                viewMode === LIST ?
                <ListItem
                  key={idx}
                  {...postProps}
                />
                :
                <GridItem
                  key={idx}  
                  {...postProps}
                />
              }
            </>
          );
        }) : <NoItems text={'최근 올라온 글이 없습니다.'} imageWidth={'30%'} />
      }
      </div>
    </div>
  );
};

export default memo(RecentPost);
