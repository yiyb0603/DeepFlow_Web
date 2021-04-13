import { useMemo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { useHistory, useLocation } from 'react-router-dom';
import { History } from 'history';

const style = require('./SelectNavbar.scss');
const cx: ClassNamesFn = classNames.bind(style);

const SelectNavbar = (): JSX.Element => {
  const { pathname } = useLocation();
  const history: History = useHistory();
  const splitedPath: string[] = useMemo(() => pathname.split('/'), [pathname]);

  const userIdx: number = useMemo(() => Number(splitedPath[2]), [splitedPath]);
  const userPath: string = useMemo(() => pathname.split('/')[1], [pathname]);

  return (
    <div className={cx('SelectNavbar')}>
      <div
        className={cx('SelectNavbar-Item', {
          'SelectNavbar-Item-Current': userPath === 'user',
        })}
        onClick={() => history.push(`/user/${userIdx}`)}
      >
        <div>프로필</div>
      </div>
      
      <div
        className={cx('SelectNavbar-Item', {
          'SelectNavbar-Item-Current': userPath === 'user-recommand',
        })}
        onClick={() => history.push(`/user-recommand/${userIdx}`)}
      >
        <div>추천 목록</div>
      </div>
    </div>
  );
};

export default SelectNavbar;
