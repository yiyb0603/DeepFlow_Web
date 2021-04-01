import { useEffect } from 'react';
import usePosts from 'hooks/usePosts';
import { EPost } from 'lib/enum/post';
import { groupingState } from 'converter/groupingState';
import Questions from 'components/Questions';

const QuestionContainer = (): JSX.Element => {
  const { 
    questionList,
    currentPage,
    onChangeCurrentPage,
    requestPostList,
    handlePrevPage,
    handleNextPage,
    numberListPage,
    splitedNumberList,
  } = usePosts(EPost.QUESTION);

  useEffect(() => {
    requestPostList();
  }, [requestPostList, currentPage]);

  return (
    <Questions
      questionList={questionList}
      currentPageState={groupingState('currentPage', currentPage, onChangeCurrentPage)}
      handlePrevPage={handlePrevPage}
      handleNextPage={handleNextPage}
      numberListPage={numberListPage}
      splitedNumberList={splitedNumberList}
    />
  );
}

export default QuestionContainer;