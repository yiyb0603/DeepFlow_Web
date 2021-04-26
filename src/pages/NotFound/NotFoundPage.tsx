import { memo } from 'react';
import NotFound from 'components/NotFound';

const NotFoundPage = (): JSX.Element => {
  return (
    <NotFound />
  );
};

export default memo(NotFoundPage);