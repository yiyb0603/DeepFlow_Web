import timeCounting from 'time-counting';

const calculateTime = (time: string | Date): string => {
	return timeCounting(time, { lang: 'ko' });
};

export default calculateTime;