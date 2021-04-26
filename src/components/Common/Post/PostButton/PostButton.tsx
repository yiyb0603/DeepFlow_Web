import { memo } from 'react';
import Button from 'components/Common/Button';

interface PostButtonProps {
  contents: string | JSX.Element;
  color: string;
  onClick: () => void;
}

const PostButton = ({
  contents,
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
      {contents}
    </Button>
  );
};

export default memo(PostButton);
