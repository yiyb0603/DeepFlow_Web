import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import NotFoundImage from 'assets/images/not-found.svg';
import { palette } from 'styles/Palette/Palette';
import Button from 'components/Common/Button';
import Helmet from 'components/Common/Helmet';

const style = require('./NotFound.scss');
const cx: ClassNamesFn = classNames.bind(style);

const NotFound = (): JSX.Element => {
  const history: History = useHistory();

  const handlePushToHome = useCallback((): void => {
    history.push('/');
  }, [history]);

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
            color={palette.main}
            onClick={handlePushToHome}
          >
            홈으로
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
