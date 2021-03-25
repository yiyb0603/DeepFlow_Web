import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./Comment.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface CommentProps {

}

const Comment = ({}: CommentProps): JSX.Element => {
  return (
    <>
      <div></div>
    </>
  );
};

export default Comment;
