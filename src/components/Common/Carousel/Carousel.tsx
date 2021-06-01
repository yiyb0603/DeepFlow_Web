import { useMemo, memo } from 'react';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from 'styled-components';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import { IBanner } from 'lib/models/banners';
import { pushToWindowLink } from 'util/pushToWindowLink';

interface CarouselProps {
  banners: IBanner[];
}

const Carousel = ({
  banners,
}: CarouselProps): JSX.Element => {
  SwiperCore.use([Navigation, Pagination, Autoplay]);
  const FOUR_SECONDS: number = 4000;
  const autoPlayOptions = useMemo(() => {
    return {
      delay: FOUR_SECONDS,
      disableOnInteraction: false,
    };
  }, []);

  return (
    <Swiper
      className='swiper-container'
      slidesPerView={1}
      pagination={{ clickable: true }}
      loop
      autoplay={autoPlayOptions}
      navigation
    >
      {
        banners.map(({ image, link }, idx: number) => (
          <SwiperSlide key={idx}>
            <ImageBanner
              src={image}
              alt={image}
              onClick={() => pushToWindowLink(link)}
            />
          </SwiperSlide>
        ))
      }
    </Swiper>
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