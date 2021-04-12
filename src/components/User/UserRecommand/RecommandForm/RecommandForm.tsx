import { memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import useRecommand from 'hooks/user/useRecommand';

const style = require('./RecommandForm.scss');
const cx: ClassNamesFn = classNames.bind(style);

const RecommandForm = (): JSX.Element => {
  const { reason, onChangeReason, requestCreateRecommand } = useRecommand();

  return (
    <div className={cx('RecommandForm')}>
      <textarea
        className={cx('RecommandForm-Form')}
        placeholder='추천 내용을 입력하세요'
        value={reason}
        onChange={onChangeReason}
      ></textarea>

      <button
        className={cx('RecommandForm-Submit')}
        onClick={requestCreateRecommand}
      >
        추천
      </button>
    </div>
  );
};

export default memo(RecommandForm);
