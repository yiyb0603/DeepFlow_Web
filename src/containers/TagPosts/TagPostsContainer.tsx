import { useEffect } from 'react';
import { useHistory } from 'react-router';
import { History } from 'history';
import TagPosts from 'components/TagPosts';
import usePosts from 'hooks/usePosts';
import { EPost } from 'lib/enum/post';
import useTag from 'hooks/useTag';

const TagPostsContainer = (): JSX.Element => {
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
      <TagPosts
        tagInfo={tagInfo}
        tagPostList={tagPostList}
      />
    }
    </>
  );
}

export default TagPostsContainer;