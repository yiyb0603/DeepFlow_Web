import { useEffect } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import ListItem from 'components/Common/Post/ListItem';
import { IPost } from 'types/post.types';
import TagInfo from './TagInfo';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import useTag from 'hooks/tag/useTag';
import usePosts from 'hooks/post/usePosts';
import { EPost } from 'lib/enum/post';

const style = require('./TagPosts.scss');
const cx: ClassNamesFn = classNames.bind(style);

const TagPosts = (): JSX.Element => {
  const history: History = useHistory();

  const { pageParam, tagInfo } = useTag();
  const { tagPostList, requestPostsByTag } = usePosts(EPost.QUESTION);
  
  useEffect(() => {
    if (!pageParam.tag) {
      history.goBack();
    }

    requestPostsByTag();
  }, [history, requestPostsByTag, tagInfo, pageParam]);

  return (
    <>
    {
      tagInfo !== null &&
      <div className={cx('TagPosts')}>
        <TagInfo tagInfo={tagInfo} count={tagPostList.length} />

        <div className={cx('TagPosts-List')}>
          {
            tagPostList.map((tagPost: IPost) => (
              <ListItem
                key={tagPost.idx}
                {...tagPost}
              />
            ))
          }
        </div>
      </div>
    }
    </>
  );
};

export default TagPosts;
