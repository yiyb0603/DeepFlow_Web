import { BiLeftArrowAlt, BiRightArrowAlt } from 'react-icons/bi';
import styled from 'styled-components';
import palette from 'styles/palette';

interface CarouselArrowProps {
  type: 'left' | 'right';
  onClick?: () => void;
}

const CarouselArrow = ({
  type,
  onClick,
}: CarouselArrowProps): JSX.Element => {
  return (
    <ArrowWrapper
      type={type}
      onClick={onClick}
    >
      {
        type === 'left' ? <BiLeftArrowAlt /> : <BiRightArrowAlt />
      }
    </ArrowWrapper>
  );
};

const ArrowWrapper = styled.div<CarouselArrowProps>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: ${palette.lighterGray};
  border-radius: 50%;
  z-index: 5;
  color: ${palette.lighterBlack};
  padding: 0.15rem;
  font-size: 1.75rem;
  ${({ type }) => type}: 0.5%;
  transition: 0.15s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: ${palette.main};
    color: ${palette.lighterGray};
  }
`;

export default CarouselArrow;
