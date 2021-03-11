import { ChangeEvent } from "react";
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./InfoInput.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface InfoInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon: JSX.Element;
}

const InfoInput = ({ value, onChange, placeholder, icon }: InfoInputProps): JSX.Element => {
  return (
    <div className={cx('InfoInput')}>
      {icon}
      <input
        type='text'
        placeholder={placeholder}
        className={cx('InfoInput-Input')}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InfoInput;
