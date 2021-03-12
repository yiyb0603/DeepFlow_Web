import timeCounting from 'time-counting';

export const calculateTime = (time: string | Date): string => {
	return timeCounting(time, { lang: 'ko' });
};