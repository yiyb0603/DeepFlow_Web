import { useEffect, useMemo } from 'react';
import { useHistory } from 'react-router';
import { History } from 'history';
import SecureLS from 'secure-ls';
import TagPosts from 'components/TagPosts';
import usePosts from 'hooks/usePosts';
import { EPost } from 'lib/enum/post';
import { ITag } from 'types/tag.types';

const TagPostsContainer = (): JSX.Element => {
  const history: History = useHistory();
  const ls: SecureLS = useMemo(() => new SecureLS({ encodingType: 'aes' }), []);
  const tagInfo: ITag = useMemo(() => ls.get('tagInfo'), [ls]);

  const {
    tagPostList,
    requestPostsByTag,
  } = usePosts(EPost.QUESTION);
  
  useEffect(() => {
    if (!tagInfo) {
      history.goBack();
    }

    requestPostsByTag();

    return () => ls.remove('tagInfo');
  }, [history, requestPostsByTag, tagInfo, ls]);

  return (
    <TagPosts
      tagInfo={tagInfo}
      tagPostList={tagPostList}
    />
  );
}

export default TagPostsContainer;