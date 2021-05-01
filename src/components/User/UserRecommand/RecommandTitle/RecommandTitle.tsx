import { memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./RecommandTitle.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface RecommandTitleProps {
  userName: string;
}

const RecommandTitle = ({
  userName,
}: RecommandTitleProps) => {
  return (
    <div className={cx('RecommandTitle')}>
      <div className={cx('RecommandTitle-Left')}>
        <span className={cx('RecommandTitle-Left-UserName')}>{userName}</span>
        <span>님을 추천해보세요!</span>
      </div>
    </div>
  );
};

export default memo(RecommandTitle);
