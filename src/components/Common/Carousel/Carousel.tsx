import { memo, MouseEvent } from 'react';
import SlickSlider from 'react-slick';
import styled from 'styled-components';
import { IBanner } from 'lib/models/banners';
import useBanners from 'hooks/common/banner/useBanners';

import 'slick-carousel/slick/slick.scss';
import 'slick-carousel/slick/slick-theme.scss';
import './Carousel.scss';

interface CarouselProps {
  banners: IBanner[];
}

const Carousel = ({
  banners,
}: CarouselProps): JSX.Element => {
  const { slickSettings, onClickBanner } = useBanners();

  return (
    <SlickSlider {...slickSettings}>
      {
        banners.map(({ image, link }) => (
          <ImageBanner
            key={image}
            src={image}
            onClick={(e: MouseEvent<HTMLImageElement>) => onClickBanner(e, link)}
          />
        ))
      }
    </SlickSlider>
  );
}

const ImageBanner = styled.img`
  width: 100%;
  height: 300px;
  max-height: 300px;
  object-fit: cover;
  cursor: pointer;
`;

export default memo(Carousel);