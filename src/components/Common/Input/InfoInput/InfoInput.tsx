import { ChangeEvent, memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

const style = require('./InfoInput.scss');
const cx: ClassNamesFn = classNames.bind(style);

export interface InfoInputProps {
  width?: string;
  name?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  icon: JSX.Element;
}

const InfoInput = ({
  width = '300px',
  name,
  value,
  onChange,
  placeholder,
  icon,
}: InfoInputProps): JSX.Element => {
  return (
    <div
      className={cx('InfoInput')}
      style={{ width }}
    >
      {icon}
      <input
        type='text'
        placeholder={placeholder}
        className={cx('InfoInput-Input')}
        name={name}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default memo(InfoInput);
