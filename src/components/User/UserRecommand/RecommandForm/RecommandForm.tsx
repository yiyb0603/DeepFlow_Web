import { memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import useRecommand from 'hooks/user/useRecommand';
import Button from 'components/Common/Button';
import { palette } from 'styles/Palette/Palette';

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


      <Button
        width={'65px'}
        color={palette.main}
        onClick={requestCreateRecommand}
        margin={'0.5rem 0 0 0'}
      >
        추천
      </Button>
    </div>
  );
};

export default memo(RecommandForm);
