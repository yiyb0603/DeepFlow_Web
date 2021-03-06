import { memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { BsBoxArrowInUp } from 'react-icons/bs';

const style = require('./ScrollToTop.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface ScrollToTopProps {
	scrollToTop: () => void;
}

const ScrollToTop = ({
	scrollToTop,
}: ScrollToTopProps): JSX.Element => {
	return (
		<div className={cx('ScrollToTop')} onClick={scrollToTop}>
			<BsBoxArrowInUp className={cx('ScrollToTop-Icon')} />
		</div>
	);
};

export default memo(ScrollToTop);