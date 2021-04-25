import { useEffect } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import useTag from 'hooks/tag/useTag';
import useViewMode from 'hooks/post/useViewMode';
import useTagPosts from 'hooks/post/useTagPosts';
import { EView } from 'lib/enum/theme';
import PageLoading from 'components/Common/PageLoading';
import { IPost } from 'types/post.types';
import ListItem from 'components/Common/Post/ListItem';
import GridItem from 'components/Common/Post/GridItem';
import TagInfo from './TagInfo';

const style = require('./TagPosts.scss');
const cx: ClassNamesFn = classNames.bind(style);

const TagPosts = (): JSX.Element => {
  const history: History = useHistory();

  const { pageParam, tagInfo } = useTag();
  const { tagPostList, requestPostsByTag } = useTagPosts();
  const { viewMode, onChangeViewMode, flexStyle } = useViewMode();
  
  useEffect(() => {
    if (!pageParam.tag) {
      history.goBack();
    }

    requestPostsByTag();
  }, [history, requestPostsByTag, tagInfo, pageParam]);

  return (
    <>
    {
      tagInfo !== null ?
      <div className={cx('TagPosts')}>
        <TagInfo
          tagInfo={tagInfo}
          count={tagPostList.length}
          viewMode={viewMode}
          onChangeViewMode={onChangeViewMode}
        />

        <div className={cx('TagPosts-List')} style={flexStyle}>
          {
            tagPostList.map((tagPost: IPost) => (
              <>
              {
                viewMode === EView.LIST ?
                <ListItem
                  key={tagPost.idx}
                  {...tagPost}
                /> :
                <GridItem
                  key={tagPost.idx}
                  {...tagPost}
                />
              }
              </>
            ))
          }
        </div>
      </div> : <PageLoading text={'태그 글 목록을 불러오는 중입니다.'} />
    }
    </>
  );
};

export default TagPosts;
