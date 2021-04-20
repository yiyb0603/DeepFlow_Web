import { memo } from 'react';
import Button from 'components/Common/Button';

interface PostButtonProps {
  text: string;
  color: 'Blue' | 'Gray';
  onClick: () => void;
}

const PostButton = ({
  text,
  color,
  onClick,
}: PostButtonProps): JSX.Element => {
  return (
    <Button
      color={color}
      onClick={onClick}
      height={'40px'}
      margin={'0 5px 0 0'}
      padding={'0 1.4rem'}
    >
      {text}
    </Button>
  );
};

export default memo(PostButton);
