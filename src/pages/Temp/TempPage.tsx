import { memo } from 'react';
import Temp from 'components/Temp';
import PageTemplate from 'components/Template/PageTemplate';

const TempPage = (): JSX.Element => {
  return (
    <PageTemplate>
      <Temp />
    </PageTemplate>
  );
}

export default memo(TempPage);