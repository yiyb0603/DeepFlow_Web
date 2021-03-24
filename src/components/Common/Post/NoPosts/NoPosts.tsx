import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./NoPosts.scss');
const cx: ClassNamesFn = classNames.bind(style);

const NoPosts = (): JSX.Element => {
  return (
    <div className={cx('NoPosts')}>
      <div className={cx('NoPosts-Text')}>작성된 게시글이 없습니다.</div>
    </div>
  );
};

export default NoPosts;
