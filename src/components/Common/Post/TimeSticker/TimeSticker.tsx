import { memo } from 'react';
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
  const stickerText: string = calculateTime(createdAt) + (updatedAt !== null ? ' (수정됨)' : '');
  // const timeBackground: CSSProperties = {
  //   backgroundColor: createRandomColor(),
  // };

  return (
    <div className={cx('TimeSticker')}>
      <div>{stickerText}</div>
    </div>
  );
};

export default memo(TimeSticker);
