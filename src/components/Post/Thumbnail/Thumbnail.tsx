import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./Thumbnail.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface ThumbnailProps {
  thumbnail: string;
}

const Thumbnail = ({
  thumbnail,
}: ThumbnailProps) => {
  return (
    <img
      src={thumbnail}
      className={cx('Thumbnail')}
      alt='thumbnail'
    />
  );
};

export default Thumbnail;
