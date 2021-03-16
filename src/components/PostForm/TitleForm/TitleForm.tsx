import { ChangeEvent } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

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
    </div>
  );
};

export default TitleForm;
