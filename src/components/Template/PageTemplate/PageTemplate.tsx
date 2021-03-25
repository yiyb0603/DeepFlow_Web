import { ReactNode, memo } from 'react';
import classNames from 'classnames';
import LeftSidebar from 'components/Common/Sidebar/LeftSidebar';
import { ClassNamesFn } from 'classnames/types';
import ToggleTheme from 'components/Common/ToggleTheme';
import ScrollToTop from 'components/Common/ScrollToTop';
import Footer from 'components/Common/Footer';
import HeaderContainer from 'containers/Header';
import RightSidebarContainer from 'containers/RightSidebar';

const style = require('./PageTemplate.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface IPageTemplateProps {
  children: ReactNode;
}

const PageTemplate = ({ children }: IPageTemplateProps): JSX.Element => {
  return (
    <div className={cx('PageTemplate')}>
      <HeaderContainer />

      <div className={cx('PageTemplate-Contents')}>
        <LeftSidebar />
        <div className={cx('PageTemplate-Contents-Children')}>
          {children}
        </div>
        <RightSidebarContainer />
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