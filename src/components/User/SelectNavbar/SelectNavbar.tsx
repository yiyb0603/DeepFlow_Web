import { useMemo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { useHistory, useLocation } from 'react-router-dom';
import { History } from 'history';
import { IUserNavbar, userNavbar } from 'lib/models/tabs/userNavbar';

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
      {
        userNavbar.map(({ name, pathName }: IUserNavbar, idx: number) => (
          <div
            key={idx}
            className={cx('SelectNavbar-Item', {
              'SelectNavbar-Item-Current': userPath === pathName,
            })}
            onClick={() => history.push(`/${pathName}/${userIdx}`)}
          >
            <div>{name}</div>
          </div>
        ))
      }
    </div>
  );
};

export default SelectNavbar;
