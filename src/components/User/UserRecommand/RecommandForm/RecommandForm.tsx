import { ChangeEvent, memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./RecommandForm.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface RecommandFormProps {
  reasonState: {
    reason: string;
    onChangeReason: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  };

  requestCreateRecommand: () => Promise<void>;
}

const RecommandForm = ({
  reasonState,
  requestCreateRecommand,
}: RecommandFormProps): JSX.Element => {
  const { reason, onChangeReason } = reasonState;

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
