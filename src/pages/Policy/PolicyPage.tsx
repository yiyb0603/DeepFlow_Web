import { memo } from 'react';
import PageTemplate from 'components/Template/PageTemplate';
import Policy from 'components/Policy';

const PolicyPage = () => {
  return (
    <PageTemplate>
      <Policy />
    </PageTemplate>
  )
}

export default memo(PolicyPage);