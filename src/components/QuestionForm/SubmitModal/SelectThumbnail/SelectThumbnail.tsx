import { memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { ImFolderUpload } from 'react-icons/im';
import NoSelected from 'assets/images/select-thumbnail.png';
import useSelectThumbnail from 'hooks/post/useSelectThumbnail';

const style = require('./SelectThumbnail.scss');
const cx: ClassNamesFn = classNames.bind(style);

const SelectThumbnail = (): JSX.Element => {
  const {
    dragRef,
    isDragging,
    thumbnail,
    onChangeThumbnail,
  } = useSelectThumbnail();
  return (
    <div className={cx('SelectThumbnail')} ref={dragRef}>
      <img
        src={thumbnail || NoSelected}
        className={cx('SelectThumbnail-Thumbnail')}
        alt='sample'
      />

      <div
        className={cx('SelectThumbnail-Overlay', {
          'SelectThumbnail-Overlay-Show': isDragging,
        })}
      >
        <input type='file' id='selectFile' onChange={onChangeThumbnail} />
        <label htmlFor='selectFile'>
          <ImFolderUpload className={cx('SelectThumbnail-Overlay-Icon')} />
        </label>
      </div>
    </div>
  );
};

export default memo(SelectThumbnail);
