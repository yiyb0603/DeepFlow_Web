import { memo, ChangeEvent, KeyboardEvent } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { EPost } from 'lib/enum/post';
import { IPagination } from 'types/pagination.types';
import { IPost } from 'types/post.types';
import PageNumberList from 'components/Common/PageNumberList';
import PageTitle from 'components/Common/PageTitle';
import ListItem from 'components/Common/Post/ListItem';
import SearchBar from './SearchBar';
import NoItems from 'components/Common/NoItems';

const style = require('./SearchPosts.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface SearchPostsProps extends IPagination {
  keywordState: {
    keyword: string;
    onChangeKeyword: (e: ChangeEvent<HTMLInputElement>) => void;
  };

  categoryState: {
    category: EPost;
    onChangeCategory: (category: EPost) => void;
  };

  searchPosts: IPost[];
  handlePushToSearch: (keyword: string, category: EPost) => void;
  onKeydownKeyword: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const SearchPosts = ({
  keywordState,
  categoryState,
  searchPosts,
  handlePushToSearch,
  onKeydownKeyword,
  currentPageState,
  numberListPage,
  handlePrevPage,
  handleNextPage,
  splitedNumberList,
}: SearchPostsProps): JSX.Element => {
  const { currentPage, onChangeCurrentPage } = currentPageState;

  return (
    <div className={cx('SearchPosts')}>
      <PageTitle
        title='글 목록 검색'
        subTitle='글을 검색하여 조회할 수 있습니다.'
      />

      <SearchBar
        handlePushToSearch={handlePushToSearch}
        onKeydownKeyword={onKeydownKeyword}
        keywordState={keywordState}
        categoryState={categoryState}
      />

      <div className={cx('SearchPosts')}>
        {
          searchPosts.length > 0 ? searchPosts.map((post: IPost) => (
            <ListItem
              key={post.idx}
              {...post}
            />
          )) : <NoItems text='검색한 글이 없습니다.' />
        }
      </div>

      {
        searchPosts.length > 0 &&
        <PageNumberList
          currentPage={currentPage}
          onChangeCurrentPage={onChangeCurrentPage}
          numberListPage={numberListPage}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          pageList={splitedNumberList}
        />
      }
    </div>
  );
};

export default memo(SearchPosts);