import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { ScaleLoader } from 'react-spinners';
import { palette } from 'styles/Palette/Palette';

const style = require('./HomeLoading.scss');
const cx: ClassNamesFn = classNames.bind(style);

const HomeLoading = (): JSX.Element => {
  return (
    <div className={cx('HomeLoading')}>
      <ScaleLoader color={palette.main} />
      <div>글을 불러오는 중입니다 🥴</div>
    </div>
  );
};

export default HomeLoading;