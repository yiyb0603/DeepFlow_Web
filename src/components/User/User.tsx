import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import UserContainer from 'containers/User';
import SelectNavbar from './SelectNavbar';

const style = require('./User.scss');
const cx: ClassNamesFn = classNames.bind(style);

const User = (): JSX.Element => {
  return (
    <div className={cx('User')}>
      <SelectNavbar />

      <UserContainer />
    </div>
  );
};

export default User;
