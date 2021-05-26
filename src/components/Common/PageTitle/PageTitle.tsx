import { ReactNode, memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./PageTitle.scss');
const cx: ClassNamesFn = classNames.bind(style);

export interface PageTitleProps {
  title: string;
  subTitle: string;
  children?: ReactNode;
}

const PageTitle = ({
  title,
  subTitle,
  children,
}: PageTitleProps): JSX.Element => {
  return (
    <div className={cx('PageTitle')}>
      <div className={cx('PageTitle-TitleWrap')}>
        <div
          data-testid='page-title'
          className={cx('PageTitle-TitleWrap-Title')}
        >
          {title}
        </div>
        <div
          data-testid='page-subtitle'
          className={cx('PageTitle-TitleWrap-SubTitle')}
        >
          {subTitle}
        </div>
      </div>

      {children && children}
    </div>
  );
};

export default memo(PageTitle);
