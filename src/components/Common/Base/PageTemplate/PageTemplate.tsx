import { ReactNode } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import LeftSidebar from 'components/Common/Base/Sidebar/LeftSidebar';
import Footer from 'components/Common/Base/Footer';
import Header from 'components/Common/Base/Header';
import RightSidebar from 'components/Common/Base/Sidebar/RightSidebar';
import PageFixed from 'components/Common/Base/PageFixed';

const style = require('./PageTemplate.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface PageTemplateProps {
  children: ReactNode;
}

const PageTemplate = ({
  children,
}: PageTemplateProps): JSX.Element => {
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
      <PageFixed />
    </div>
  );
};

export default PageTemplate;