import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./PageTitle.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface PageTitleProps {
  title: string;
  subTitle: string;
}

const PageTitle = ({ title, subTitle }: PageTitleProps): JSX.Element => {
  return (
    <div className={cx('PageTitle')}>
      <div className={cx('PageTitle-TitleWrap')}>
        <div className={cx('PageTitle-TitleWrap-Title')}>{title}</div>
        <div className={cx('PageTitle-TitleWrap-SubTitle')}>{subTitle}</div>
      </div>
    </div>
  );
};

export default PageTitle;
