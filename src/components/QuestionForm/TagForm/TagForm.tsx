import { ChangeEvent, KeyboardEvent } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import TagItem from 'components/Common/Post/TagItem';

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
      <div className={cx('TagForm-Wrapper')}>
        {
          postTags.map((postTag: string, idx: number) => (
            <TagItem
              key={idx}
              postTag={postTag}
              isClose
              filterFunction={() => handleFilterPostTag(postTag)}
            />
          ))
        }

        <input
          type='text'
          className={cx('TagForm-Wrapper-Input')}
          value={tagInput}
          onChange={onChangeTagInput}
          onKeyDown={onKeydownTagInput}
          placeholder='태그를 입력하세요'
        />
      </div>
    </div>
  );
};

export default TagForm;
