import { memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import Logo from 'assets/icons/FaviconLogo.svg';
import FooterLogo from './FooterLogo';
import FooterTextZone from './FooterTextZone';

const style = require('./Footer.scss');
const cx: ClassNamesFn = classNames.bind(style);

const Footer = (): JSX.Element => {
  return (
    <div className={cx('Footer')}>
      <div className={cx('Footer-Wrapper')}>
        <div className={cx('Footer-Contents')}>
          <img
            src={Logo}
            className={cx('Footer-Contents-Logo')}
            alt='logo'
          />

          <FooterTextZone />
        </div>

        <FooterLogo />
      </div>
    </div>
  );
};

export default memo(Footer);
