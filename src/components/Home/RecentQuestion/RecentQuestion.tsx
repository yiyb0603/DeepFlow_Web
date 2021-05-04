import { memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { EView } from 'lib/enum/theme';
import { IQuestion } from 'types/post.types';
import useRecentPosts from 'hooks/post/useRecentPosts';
import useViewMode from 'hooks/post/useViewMode';
import GridItem from 'components/Common/Post/GridItem';
import ListItem from 'components/Common/Post/ListItem';
import NoItems from 'components/Common/NoItems';
import SelectViewMode from 'components/Common/Post/SelectViewMode';
import HomeSectionTitle from '../HomeSectionTitle';

const style = require('./RecentQuestion.scss');
const cx: ClassNamesFn = classNames.bind(style);

const RecentQuestion = (): JSX.Element => {
  const { recentPosts } = useRecentPosts();
  const { viewMode, onChangeViewMode, flexStyle } = useViewMode();
  
  const { LIST } = EView;

  return (
    <div className={cx('RecentQuestion')}>
      <HomeSectionTitle title='최근 올라온 질문글'>
        <SelectViewMode
          viewMode={viewMode}
          onChangeViewMode={onChangeViewMode}
        />
      </HomeSectionTitle>

      <div className={cx('RecentQuestion-List')} style={flexStyle}>
      {
        recentPosts.length > 0 ? recentPosts.map((post: IQuestion) => {
          return (
            <>
              {
                viewMode === LIST ?
                <ListItem
                  key={post.idx}
                  {...post}
                />
                :
                <GridItem
                  key={post.idx}  
                  {...post}
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

export default memo(RecentQuestion);
