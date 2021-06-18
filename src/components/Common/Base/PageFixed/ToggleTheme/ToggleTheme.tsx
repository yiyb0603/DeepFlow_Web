import { memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { IoMdSunny } from 'react-icons/io';
import { FaMoon } from 'react-icons/fa';
import useTheme from 'hooks/common/theme/useTheme';
import { ETheme } from 'lib/enum/theme';

const style = require('./ToggleTheme.scss');
const cx: ClassNamesFn = classNames.bind(style);

const ToggleTheme = (): JSX.Element => {
  const { theme, handleChangeTheme } = useTheme();

  return (
    <div
      className={cx('ToggleTheme')}
      onClick={handleChangeTheme}
    >
      {
        theme === ETheme.LIGHT ? <FaMoon /> : <IoMdSunny />
      }
    </div>
  );
};

export default memo(ToggleTheme);
