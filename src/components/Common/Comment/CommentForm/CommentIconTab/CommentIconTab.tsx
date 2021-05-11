import { ChangeEvent, memo, useMemo } from 'react';
import { MdImage } from 'react-icons/md';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import createRandomNumber from 'lib/CreateRandomNumber';

const style = require('./CommentIconTab.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface CommentIconTabProps {
  onImageSelect: (e: ChangeEvent<HTMLInputElement> | DragEvent) => void;
}

const CommentIconTab = ({
  onImageSelect,
}: CommentIconTabProps): JSX.Element => {
  const selectFileId: string = useMemo(() => createRandomNumber().toString(), []);

  return (
    <div className={cx('CommentIconTab')}>
      <input
        type='file'
        id={selectFileId}
        onChange={onImageSelect}
        multiple={true}
      />
      <label
        htmlFor={selectFileId}
      >
        <MdImage />
      </label>
    </div>
  );
};

export default memo(CommentIconTab);
