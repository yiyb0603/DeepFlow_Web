import TimeConverter from 'converter/TimeConverter';

const calculateTime = (time: string | Date): string => {
	const timeConverter: TimeConverter = new TimeConverter(time);
	const takenTime: number = timeConverter.milliSecondsToMinutes();

	if (takenTime < 1) {
		return '방금 전';
	} else if (takenTime < 60) {
		return `${takenTime}분 전`;
	}

	const takenHour: number = timeConverter.milliSecondsToHour();
	if (takenHour < 24) {
		return `${takenHour}시간 전`;
	}

	const takenDate: number = timeConverter.milliSecondsToDate();
	if (takenDate < 32) {
		return `${takenDate}일 전`;
	}

	const takenMonth: number = timeConverter.milliSecondsToMonth();
	if (takenMonth < 12) {
		return `${takenMonth}개월 전`;
	}

	return `${takenTime / 365}년 전`;
};

export default calculateTime;