import { memo } from 'react';
import Tags from 'components/Tags';
import PageTemplate from 'components/Template/PageTemplate';

const TagsPage = (): JSX.Element => {
  return (
    <PageTemplate>
      <Tags />
    </PageTemplate>
  );
}

export default memo(TagsPage);