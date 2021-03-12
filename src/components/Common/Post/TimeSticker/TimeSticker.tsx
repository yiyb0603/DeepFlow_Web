import { CSSProperties } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { createRandomColor } from 'util/createRandomColor';

const style = require('./TimeSticker.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface TimeStickerProps {
  text: string;
}

const TimeSticker = ({ text }: TimeStickerProps): JSX.Element => {
  const timeBackground: CSSProperties = {
    backgroundColor: createRandomColor(),
  };

  return (
    <div className={cx('TimeSticker')} style={timeBackground}>
      <div>{text}</div>
    </div>
  );
};

export default TimeSticker;
