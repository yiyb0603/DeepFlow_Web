import { CSSProperties, memo, useCallback, useState } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { AiOutlineUnorderedList } from 'react-icons/ai';
import { BsFillGrid3X3GapFill } from 'react-icons/bs';
import Sample from 'assets/images/sample.png';
import { EView } from 'lib/enum/theme';
import { IPost } from 'types/post.types';
import useRecentPosts from 'hooks/post/useRecentPosts';
import GridItem from 'components/Common/Post/GridItem';
import ListItem from 'components/Common/Post/ListItem';
import NoItems from 'components/Common/NoItems';
import SectionTitle from '../SectionTitle';

const style = require('./RecentPost.scss');
const cx: ClassNamesFn = classNames.bind(style);

const RecentPost = (): JSX.Element => {
  const { recentPosts } = useRecentPosts();
  
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
      <SectionTitle title='최근 올라온 질문글'>
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
      </SectionTitle>

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
