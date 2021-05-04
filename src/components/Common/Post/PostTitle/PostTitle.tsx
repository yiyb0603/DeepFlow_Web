import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./PostTitle.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface PostTitleProps {
  title: string;
}

const PostTitle = ({
  title,
}: PostTitleProps): JSX.Element => {
  return (
    <div className={cx('PostTitle')}>{title}</div>
  );
};

export default PostTitle;
