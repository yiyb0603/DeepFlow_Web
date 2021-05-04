import { memo } from 'react';
import useSearchPosts from 'hooks/question/useSearchQuestions';
import { IQuestion } from 'types/question.types';
import PageNumberList from 'components/Common/Post/PageNumberList';
import PageTitle from 'components/Common/PageTitle';
import ListItem from 'components/Common/Post/ListItem';
import NoItems from 'components/Common/NoItems';
import Helmet from 'components/Common/Helmet';
import SearchBar from './SearchBar';

const SearchQuestions = (): JSX.Element => {
  const {
    keyword,
    onChangeKeyword,
    onKeydownKeyword,
    handlePushToSearch,
    searchQuestions,
    currentPage,
    onChangeCurrentPage,
    handlePrevPage,
    handleNextPage,
    numberListPage,
    splitedNumberList,
  } = useSearchPosts();

  return (
    <div>
      <Helmet title='글 목록 검색' />
      <PageTitle
        title='글 목록 검색'
        subTitle='글을 검색하여 조회할 수 있습니다.'
      />

      <SearchBar
        handlePushToSearch={handlePushToSearch}
        onKeydownKeyword={onKeydownKeyword}
        keyword={keyword}
        onChangeKeyword={onChangeKeyword}
      />

      <div>
        {
          searchQuestions.length > 0 ?
          searchQuestions.map((question: IQuestion) => (
            <ListItem
              key={question.idx}
              {...question}
            />
          )) : <NoItems text='검색한 글이 없습니다.' />
        }
      </div>

      {
        searchQuestions.length > 0 &&
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

export default memo(SearchQuestions);