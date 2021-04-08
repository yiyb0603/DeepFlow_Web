import { ChangeEvent } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { AiOutlineSearch } from 'react-icons/ai';

const style = require('./SearchUsers.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface SearchUsersProps {
  keywordState: {
    keyword: string;
    onChangeKeyword: (e: ChangeEvent<HTMLInputElement>) => void;
  };
}

const SearchUsers = ({
  keywordState,
}: SearchUsersProps): JSX.Element => {
  const { keyword, onChangeKeyword } = keywordState;
  
  return (
    <div className={cx('SearchUsers')}>
      <AiOutlineSearch className={cx('SearchUsers-Icon')} />
      <input
        type='text'
        className={cx('SearchUsers-Search')}
        placeholder='유저 이름을 검색하세요'
        value={keyword}
        onChange={onChangeKeyword}
      />
    </div>
  );
};

export default SearchUsers;