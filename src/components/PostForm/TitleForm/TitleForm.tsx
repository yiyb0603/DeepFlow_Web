import { ChangeEvent } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { customTrim } from 'converter/customTrim';

const style = require('./TitleForm.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface TitleFormProps {
  title: string;
  onChangeTitle: (e: ChangeEvent<HTMLInputElement>) => void;
}

const TitleForm = ({ title, onChangeTitle }: TitleFormProps): JSX.Element => {
  return (
    <div className={cx('TitleForm')}>
      <input
        type='text'
        className={cx('TitleForm-Input')}
        value={title}
        onChange={onChangeTitle}
        placeholder='제목을 입력하세요'
      />

      <input
        type='text'
        className={cx('TitleForm-Title')}
        value={customTrim(title).length > 0 ? `제목: ${title}` : ''}
        readOnly={true}
      />
    </div>
  );
};

export default TitleForm;
