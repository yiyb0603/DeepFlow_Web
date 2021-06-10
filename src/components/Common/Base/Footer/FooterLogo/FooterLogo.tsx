import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import B1NDLogo from 'assets/icons/B1ndLogo.svg';
import { AiOutlineGithub } from 'react-icons/ai';
import { DODAM_LINK } from 'constants/link';
import getGithubAddress from 'util/getGithubAddress';
import { pushToWindowLink } from 'util/pushToWindowLink';

const style = require('./FooterLogo.scss');
const cx: ClassNamesFn = classNames.bind(style);

const FooterLogo = (): JSX.Element => {
  return (
    <div className={cx('FooterLogo')}>
      <AiOutlineGithub
        className={cx('FooterLogo-Github')}
        onClick={() => pushToWindowLink(getGithubAddress('yiyb0603'))}
      />

      <img
        src={B1NDLogo}
        className={cx('FooterLogo-B1ND')}
        alt='b1nd logo'
        onClick={() => pushToWindowLink(DODAM_LINK)}
      />
    </div>
  );
};

export default FooterLogo;
