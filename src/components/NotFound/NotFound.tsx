import { useCallback } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import NotFoundImage from 'assets/images/not-found.svg';
import palette from 'styles/palette';
import Button from 'components/Common/Button';
import Helmet from 'components/Common/Helmet';
import { historySingleton } from 'lib/singleton/history';

const style = require('./NotFound.scss');
const cx: ClassNamesFn = classNames.bind(style);

const NotFound = (): JSX.Element => {
  const handlePushToHome = useCallback((): void => {
    historySingleton.push('/');
  }, []);

  return (
    <div className={cx('NotFound')}>
      <Helmet
        title='Not Found'
      />

      <div className={cx('NotFound-ContentsWrap')}>
        <img  
          src={NotFoundImage}
          className={cx('NotFound-ContentsWrap-Image')}
          alt='NotFound'
        />

        <div className={cx('NotFound-ContentsWrap-Contents')}>
          <div className={cx('NotFound-ContentsWrap-Contents-Title')}>
            Page Not Found
          </div>

          <div className={cx('NotFound-ContentsWrap-Contents-SubTitle')}>
            요청한 URL 페이지를 찾을 수 없어요.
          </div>

          <Button
            width={'120px'}
            height={'40px'}
            backgroundColor={palette.main}
            handleClick={handlePushToHome}
          >
            홈으로
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
