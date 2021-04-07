import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./UserRecommand.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface UserRecommandProps {

}

const UserRecommand = ({}: UserRecommandProps): JSX.Element => {
  return (
    <>
      <div></div>
    </>
  );
};

export default UserRecommand;
