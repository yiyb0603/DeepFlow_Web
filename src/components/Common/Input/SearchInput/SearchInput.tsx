import { ChangeEvent, CSSProperties, KeyboardEvent } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { AiOutlineSearch } from 'react-icons/ai';

const style = require('./SearchInput.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface SearchInputProps {
  value: string;
  onChangeValue: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  onKeydown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onClick?: () => void;
  isBorder?: boolean;
  padding?: string;
}

const SearchInput = ({
  value,
  onChangeValue,
  placeholder,
  onKeydown,
  onClick,
  isBorder = true,
  padding,
}: SearchInputProps): JSX.Element => {
  const searchPadding: CSSProperties = {
    padding,
  };
  
  return (
    <div className={cx('SearchInput', {
      'SearchInput-Border': isBorder,
    })} style={searchPadding}>
      <AiOutlineSearch className={cx('SearchInput-Icon')} />
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
