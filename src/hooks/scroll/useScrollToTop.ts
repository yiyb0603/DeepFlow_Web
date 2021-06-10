import { useState, useCallback, useEffect } from 'react';

const useScrollToTop = () => {
  const [isBothSide, setIsBothSide] = useState<boolean>(true);

	const detectingScroll = useCallback((): void => {
		const { innerHeight } = window;
		const { scrollTop } = document.documentElement;
		const { scrollHeight } = document.body;

		if (scrollTop <= 0 || Math.round(scrollTop + innerHeight) >= scrollHeight) {
			setIsBothSide(true);
			return;
		}

		setIsBothSide(false);
	}, []);

	const scrollToTop = useCallback((): void => {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}, []);

	useEffect(() => {
		window.addEventListener('scroll', detectingScroll, true);

		return () => window.removeEventListener('scroll', detectingScroll, true);
	}, [detectingScroll]);

  return {
    isBothSide,
    scrollToTop,
  };
}

export default useScrollToTop;