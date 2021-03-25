import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { ScaleLoader } from 'react-spinners';
import { palette } from 'styles/Palette/Palette';

const style = require('./PageLoading.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface PageLoadingProps {
  text: string;
}

const PageLoading = ({ text }: PageLoadingProps) => {
  return (
    <div className={cx('PageLoading')}>
      <ScaleLoader color={palette.main} />
      <div>{text}</div>
    </div>
  );
};

export default PageLoading;
