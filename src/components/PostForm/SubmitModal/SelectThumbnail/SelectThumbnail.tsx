import { ChangeEvent, memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { ImFolderUpload } from 'react-icons/im';
import NoSelected from 'assets/images/select-thumbnail.png';

const style = require('./SelectThumbnail.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface SelectThumbnailProps {
  thumbnail: string;
  onChangeThumbnail: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
}

const SelectThumbnail = ({ thumbnail, onChangeThumbnail }: SelectThumbnailProps): JSX.Element => {
  return (
    <div className={cx('SelectThumbnail')}>
      <img
        src={thumbnail || NoSelected}
        className={cx('SelectThumbnail-Thumbnail')}
        alt='sample'
      />

      <div className={cx('SelectThumbnail-Overlay')}>
        <input type='file' id='selectFile' onChange={onChangeThumbnail} />
        <label htmlFor='selectFile'>
          <ImFolderUpload className={cx('SelectThumbnail-Overlay-Icon')} />
        </label>
      </div>
    </div>
  );
};

export default memo(SelectThumbnail);
