import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import styled from 'styled-components';
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

interface CarouselProps {
  images: string[];
}

const Carousel = ({ images }: CarouselProps): JSX.Element => {
  SwiperCore.use([Navigation, Pagination, Autoplay]);
  const FIVE_SECONDS: number = 5000;
  
  return (
    <Swiper
      className='swiper-container'
      slidesPerView={1}
      pagination={{ clickable: true }}
      loop={true}
      autoplay={{ delay: FIVE_SECONDS }}
      navigation={true}
    >
      {
        images.map((image: string, idx: number) => (
          <SwiperSlide key={idx}>
            <ImageBanner src={image} alt='image1111' />
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
`;

export default Carousel;