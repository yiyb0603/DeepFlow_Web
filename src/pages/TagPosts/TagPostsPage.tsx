import { memo } from 'react';
import TagPosts from 'components/TagPosts';
import PageTemplate from 'components/Template/PageTemplate';

const TagPostsPage = (): JSX.Element => {
  return (
    <PageTemplate>
      <TagPosts />
    </PageTemplate>
  );
}

export default memo(TagPostsPage);