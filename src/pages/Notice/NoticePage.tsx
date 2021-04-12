import { memo } from 'react';
import Notice from 'components/Notice';
import PageTemplate from 'components/Template/PageTemplate';

const NoticePage = (): JSX.Element => {
  return (
    <PageTemplate>
      <Notice />
    </PageTemplate>
  );
};

export default memo(NoticePage);