import { ReactNode, memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import LeftSidebar from 'components/Common/Sidebar/LeftSidebar';
import ToggleTheme from 'components/Common/ToggleTheme';
import ScrollToTop from 'components/Common/ScrollToTop';
import Footer from 'components/Common/Footer';
import Header from 'components/Common/Header';
import RightSidebar from 'components/Common/Sidebar/RightSidebar';

const style = require('./PageTemplate.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface IPageTemplateProps {
  children: ReactNode;
}

const PageTemplate = ({ children }: IPageTemplateProps): JSX.Element => {
  return (
    <div className={cx('PageTemplate')}>
      <Header />

      <div className={cx('PageTemplate-Contents')}>
        <LeftSidebar />
        <div className={cx('PageTemplate-Contents-Children')}>
          {children}
        </div>
        <RightSidebar />
      </div>

      <Footer />
      <div className={cx('PageTemplate-Fixed')}>
        <ToggleTheme />
        <ScrollToTop />
      </div>
    </div>
  );
};

export default memo(PageTemplate);