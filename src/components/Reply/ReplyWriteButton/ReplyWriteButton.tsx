import { CSSProperties, useMemo } from 'react';
import Button from 'components/Common/Button';
import palette from 'styles/palette';

interface ReplyWriteButtonProps {
  onClick: () => void;
}

const ReplyWriteButton = ({
  onClick,
}: ReplyWriteButtonProps): JSX.Element => {
  const customButtonStyle: CSSProperties = useMemo(() => {
    return {
      fontSize: '1.1rem',
      border: `1px solid ${palette.main}`,
    };
  }, []);

  return (
    <Button
      width='100%'
      height='45px'
      customStyle={customButtonStyle}
      backgroundColor={palette.white}
      color={palette.black}
      handleClick={onClick}
    >
      답글 작성
    </Button>
  );
};

export default ReplyWriteButton;
