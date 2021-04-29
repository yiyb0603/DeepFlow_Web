import { Spinner } from '@class101/ui';
import { palette } from 'styles/Palette/Palette';

const LoadingSpinner = (): JSX.Element => {
  return (
    <Spinner
      backgroundColor={palette.main}
      color={palette.white}
      size={24}
    />
  );
};

export default LoadingSpinner;