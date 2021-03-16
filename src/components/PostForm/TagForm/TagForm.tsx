import { ChangeEvent, KeyboardEvent } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { MdClose } from 'react-icons/md';

const style = require('./TagForm.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface TagFormProps {
  postTags: string[];
  tagInput: string;
  onChangeTagInput: (e: ChangeEvent<HTMLInputElement>) => void;
  handleFilterPostTag: (tagName: string) => void;
  onKeydownTagInput: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const TagForm = ({
  postTags,
  tagInput,
  onChangeTagInput,
  onKeydownTagInput,
  handleFilterPostTag,
}: TagFormProps): JSX.Element => {
  return (
    <div className={cx('TagForm')}>
      {
        postTags.map((postTag: string, idx: number) => (
          <div
            className={cx('TagForm-Tag')}
            key={idx}
          >
            <MdClose
              className={cx('TagForm-Tag-Close')}
              onClick={() => handleFilterPostTag(postTag)}
            />
            {postTag}
          </div>
        ))
      }
      <input
        type='text'
        className={cx('TagForm-Input')}
        value={tagInput}
        onChange={onChangeTagInput}
        onKeyDown={onKeydownTagInput}
        placeholder='태그를 입력하세요'
      />
    </div>
  );
};

export default TagForm;
