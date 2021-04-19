import { memo } from 'react';
import { Spinner } from '@class101/ui';
import { palette } from 'styles/Palette/Palette';

const AuthSpinner = (): JSX.Element => {
  return (
    <Spinner
      backgroundColor={palette.main}
      color={palette.white}
      size={24}
    />
  );
};

export default memo(AuthSpinner);
