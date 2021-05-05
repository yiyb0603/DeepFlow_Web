import { memo, useMemo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { calculateTime } from 'lib/TimeCounting';

const style = require('./TimeSticker.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface TimeStickerProps {
  createdAt: Date | string;
  updatedAt: Date | string | null;
}

const TimeSticker = ({ createdAt, updatedAt }: TimeStickerProps): JSX.Element => {
  const stickerText: string = useMemo(() => {
    return calculateTime(createdAt) + (updatedAt !== null ? ' (수정됨)' : '');
  }, [createdAt, updatedAt]);

  return (
    <div className={cx('TimeSticker')}>
      <div>{stickerText}</div>
    </div>
  );
};

export default memo(TimeSticker);
