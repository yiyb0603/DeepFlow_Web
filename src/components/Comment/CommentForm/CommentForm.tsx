import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import PreviewTab from '../PreviewTab';
import CommentInput from './CommentInput';

const style = require('./CommentForm.scss');
const cx: ClassNamesFn = classNames.bind(style);

const CommentForm = (): JSX.Element => {
  return (
    <div className={cx('CommentForm')}>
      <PreviewTab />
      <CommentInput />
    </div>
  );
};

export default CommentForm;
