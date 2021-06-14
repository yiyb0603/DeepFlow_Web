import { ChangeEvent, memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import Textarea from 'react-autosize-textarea';
import customTrim from 'converter/customTrim';

const style = require('./TitleForm.scss');
const cx: ClassNamesFn = classNames.bind(style);

export interface TitleFormProps {
  title: string;
  onChangeTitle: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

const TitleForm = ({
  title,
  onChangeTitle,
}: TitleFormProps): JSX.Element => {
  return (
    <div className={cx('TitleForm')}>
      <Textarea
        name='title'
        id='titleFormInput'
        className={cx('TitleForm-Input')}
        value={title}
        onChange={onChangeTitle}
        placeholder='제목을 입력하세요'
      ></Textarea>

      <Textarea
        type='text'
        className={cx('TitleForm-Input')}
        value={customTrim(title).length > 0 ? title : ''}
        readOnly
      ></Textarea>
    </div>
  );
};

export default memo(TitleForm);