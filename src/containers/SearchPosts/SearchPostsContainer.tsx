import { memo } from 'react';
import SearchPosts from 'components/SearchPosts';
import { groupingState } from 'converter/groupingState';
import useSearchPosts from 'hooks/useSearchPosts';

const SearchPostsContainer = (): JSX.Element => {
  const {
    keyword,
    onChangeKeyword,
    onKeydownKeyword,
    category,
    onChangeCategory,
    handlePushToSearch,
    searchPosts,
    currentPage,
    onChangeCurrentPage,
    handlePrevPage,
    handleNextPage,
    numberListPage,
    splitedNumberList,
  } = useSearchPosts();

  return (
    <SearchPosts
      keywordState={groupingState('keyword', keyword, onChangeKeyword)}
      categoryState={groupingState('category', category, onChangeCategory)}
      currentPageState={groupingState('currentPage', currentPage, onChangeCurrentPage)}
      handlePrevPage={handlePrevPage}
      handleNextPage={handleNextPage}
      numberListPage={numberListPage}
      splitedNumberList={splitedNumberList}
      searchPosts={searchPosts}
      handlePushToSearch={handlePushToSearch}
      onKeydownKeyword={onKeydownKeyword}
    />
  );
}

export default memo(SearchPostsContainer);