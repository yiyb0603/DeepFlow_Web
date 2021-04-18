import { memo } from 'react';
import { userRecommandReasonState } from 'atom/userRecommand';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { useRecoilValue } from 'recoil';
import { MAX_REASON_LENGTH } from 'constants/recommand';

const style = require('./RecommandTitle.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface RecommandTitleProps {
  userName: string;
}

const RecommandTitle = ({
  userName,
}: RecommandTitleProps) => {
  const reason: string = useRecoilValue<string>(userRecommandReasonState);

  return (
    <div className={cx('RecommandTitle')}>
      <div className={cx('RecommandTitle-Left')}>
        <span className={cx('RecommandTitle-Left-UserName')}>{userName}</span>
        <span>님을 추천해보세요!</span>
      </div>

      <div className={cx('RecommandTitle-Length', {
        'RecommandTitle-Length-Hidden': reason.length <= 0,
        'RecommandTitle-Length-Overflow': reason.length > MAX_REASON_LENGTH,
      })}>{reason.length} / {MAX_REASON_LENGTH}</div>
    </div>
  );
};

export default memo(RecommandTitle);
