import { useEffect, useMemo } from 'react';
import SecureLS from 'secure-ls';
import TagPosts from 'components/TagPosts';
import usePosts from 'hooks/usePosts';
import { EPost } from 'lib/enum/post';
import { ITag } from 'types/tag.types';

const TagPostsContainer = (): JSX.Element => {
  const ls: SecureLS = useMemo(() => new SecureLS({ encodingType: 'aes' }), []);
  const tagInfo: ITag = useMemo(() => ls.get('tagInfo'), [ls]);

  const {
    tagPostList,
    requestPostsByTag,
  } = usePosts(EPost.QUESTION);
  
  useEffect(() => {
    requestPostsByTag();
  }, [requestPostsByTag]);

  return (
    <TagPosts
      tagPostList={tagPostList}
    />
  );
}

export default TagPostsContainer;