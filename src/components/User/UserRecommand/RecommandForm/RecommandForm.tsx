import { memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import palette from 'styles/palette';
import useCreateRecommand from 'hooks/recommand/useCreateRecommand';
import Button from 'components/Common/Button';

const style = require('./RecommandForm.scss');
const cx: ClassNamesFn = classNames.bind(style);

const RecommandForm = (): JSX.Element => {
  const { reason, onChangeReason, requestCreateRecommand } = useCreateRecommand();

  return (
    <div className={cx('RecommandForm')}>
      <textarea
        className={cx('RecommandForm-Form')}
        placeholder='추천 내용을 입력하세요'
        value={reason}
        onChange={onChangeReason}
      ></textarea>

      <Button
        width='65px'
        backgroundColor={palette.main}
        handleClick={requestCreateRecommand}
      >
        추천
      </Button>
    </div>
  );
};

export default memo(RecommandForm);
