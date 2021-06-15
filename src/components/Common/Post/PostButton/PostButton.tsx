import { memo } from 'react';
import Button from 'components/Common/Button';

interface PostButtonProps {
  isLoading?: boolean;
  contents: string | JSX.Element;
  backgroundColor: string;
  onClick: () => void;
}

const PostButton = ({
  isLoading = false,
  contents,
  backgroundColor,
  onClick,
}: PostButtonProps): JSX.Element => {
  return (
    <Button
      isLoading={isLoading}
      backgroundColor={backgroundColor}
      handleClick={onClick}
      height='40px'
      margin='0 0 0 5px'
      padding='0 1.4rem'
    >
      {contents}
    </Button>
  );
};

export default memo(PostButton);
