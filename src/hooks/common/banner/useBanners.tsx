import { useState, useCallback, useMemo, MouseEvent } from 'react';
import { Settings } from 'react-slick';
import pushToWindowLink from 'util/pushToWindowLink';
import CarouselArrow from 'components/Common/Carousel/CarouselArrow';

// this hook only based on react-slick structure
const useBanners = () => {
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const onBeforeChange = useCallback((): void => {
    setIsDragging(true);
  }, []);

  const onAfterChange = useCallback((): void => {
    setIsDragging(false);
  }, []);

  const onClickBanner = useCallback((e: MouseEvent<HTMLImageElement>, link: string): void => {
    if (isDragging) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    pushToWindowLink(link);
  }, [isDragging]);

  const slickSettings: Settings = useMemo(() => {
    return {
      dots: true,
      arrows: true,
      autoplay: true,
      autoplaySpeed: 5000,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      pauseOnHover: false,
      beforeChange: onBeforeChange,
      afterChange: onAfterChange,
      prevArrow: <CarouselArrow type='left' />,
      nextArrow: <CarouselArrow type='right' />,
    };
  }, [onAfterChange, onBeforeChange]);

  return {
    onClickBanner,
    slickSettings,
  };
}

export default useBanners;