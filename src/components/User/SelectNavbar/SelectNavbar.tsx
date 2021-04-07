import { useMemo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { Link, useLocation } from 'react-router-dom';

const style = require('./SelectNavbar.scss');
const cx: ClassNamesFn = classNames.bind(style);

const SelectNavbar = (): JSX.Element => {
  const { pathname } = useLocation();
  const splitedPath: string[] = useMemo(() => pathname.split('/'), [pathname]);

  const userIdx: number = useMemo(() => Number(splitedPath[2]), [splitedPath]);
  const userPath: string = useMemo(() => pathname.split('/')[1], [pathname]);

  return (
    <div className={cx('SelectNavbar')}>
      <Link
        to={`/user/${userIdx}`}
        className={cx('SelectNavbar-Item', {
          'SelectNavbar-Item-Current': userPath === 'user',
        })}
      >
        <div>프로필</div>
      </Link>
      
      <Link
        to={`/user-recommand/${userIdx}`}
        className={cx('SelectNavbar-Item', {
          'SelectNavbar-Item-Current': userPath === 'user-recommand',
        })}
      >
        <div>추천 목록</div>
      </Link>
    </div>
  );
};

export default SelectNavbar;
