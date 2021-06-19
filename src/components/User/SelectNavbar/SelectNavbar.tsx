import { useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { IUserNavbar, userNavbar } from 'lib/models/tabs/userNavbar';

const style = require('./SelectNavbar.scss');
const cx: ClassNamesFn = classNames.bind(style);

const SelectNavbar = (): JSX.Element => {
  const { pathname } = useLocation();

  const splitedPath: string[] = useMemo(() => pathname.split('/'), [pathname]);
  const userIdx: number = useMemo(() => Number(splitedPath[2]), [splitedPath]);
  const userPath: string = useMemo(() => pathname.split('/')[1], [pathname]);

  return (
    <div className={cx('SelectNavbar')}>
      {
        userNavbar.map(({ idx, name, pathName }: IUserNavbar) => (
          <Link
            key={idx}
            to={`/${pathName}/${userIdx}`}
            className={cx('SelectNavbar-Item', {
              'SelectNavbar-Item-Current': userPath === pathName,
            })}
          >
            <div>{name}</div>
          </Link>
        ))
      }
    </div>
  );
};

export default SelectNavbar;
