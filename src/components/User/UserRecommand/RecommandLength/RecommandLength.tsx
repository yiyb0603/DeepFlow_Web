import { useRecoilValue } from 'recoil';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { userRecommandReasonState } from 'atom/userRecommand';
import { MAX_REASON_LENGTH } from 'constants/recommand';

const style = require('./RecommandLength.scss');
const cx: ClassNamesFn = classNames.bind(style);

const RecommandLength = (): JSX.Element => {
  const reason: string = useRecoilValue<string>(userRecommandReasonState);

  return (
    <div className={cx('RecommandLength', {
      'RecommandLength-Hidden': reason.length <= 0,
      'RecommandLength-Overflow': reason.length > MAX_REASON_LENGTH,
    })}>
      {reason.length} / {MAX_REASON_LENGTH}
    </div>
  );
};

export default RecommandLength;
