import { useRecoilValue } from 'recoil';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { userRecommandReasonState } from 'lib/recoil/atom/userRecommand';
import { MAX_REASON_LENGTH } from 'constants/recommand';
import isEmpty from 'util/isEmpty';

const style = require('./RecommandLength.scss');
const cx: ClassNamesFn = classNames.bind(style);

const RecommandLength = (): JSX.Element => {
  const reason: string = useRecoilValue<string>(userRecommandReasonState);

  return (
    <div className={cx('RecommandLength', {
      'RecommandLength-Hidden': isEmpty(reason),
      'RecommandLength-Overflow': reason.length > MAX_REASON_LENGTH,
    })}>
      {reason.length} / {MAX_REASON_LENGTH}
    </div>
  );
};

export default RecommandLength;
