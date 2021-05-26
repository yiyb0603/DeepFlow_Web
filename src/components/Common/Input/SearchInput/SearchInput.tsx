import { ChangeEvent, CSSProperties, KeyboardEvent, useMemo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { AiOutlineSearch } from 'react-icons/ai';

const style = require('./SearchInput.scss');
const cx: ClassNamesFn = classNames.bind(style);

export interface SearchInputProps {
  value: string;
  onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  onKeydown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  isBorder?: boolean;
  padding?: string;
  fontSize?: string;
}

const SearchInput = ({
  value,
  onChangeValue,
  placeholder,
  onKeydown,
  onClick,
  isBorder = true,
  padding,
  fontSize,
}: SearchInputProps): JSX.Element => {
  const searchStyle: CSSProperties = useMemo(() => {
    return {
      padding,
      fontSize,
    };
  }, [fontSize, padding]);
  
  return (
    <div className={cx('SearchInput', {
      'SearchInput-Border': isBorder,
    })} style={searchStyle}>
      <AiOutlineSearch
        className={cx('SearchInput-Icon')}
      />
      <input
        type='text'
        className={cx('SearchInput-Input')}
        value={value}
        onChange={onChangeValue}
        onKeyDown={onKeydown}
        onClick={onClick}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchInput;
