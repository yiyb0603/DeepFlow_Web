import { useEffect } from 'react';
import usePosts from 'hooks/usePosts';
import Temp from 'components/Temp';
import { groupingState } from 'converter/groupingState';

const TempContainer = (): JSX.Element => {
  const {
    tempPosts,
    currentPage,
    onChangeCurrentPage,
    handlePrevPage,
    handleNextPage,
    numberListPage,
    splitedNumberList,
    requestTempPosts,
  } = usePosts();

  useEffect(() => {
    requestTempPosts();
  }, [requestTempPosts]);

  return (
    <Temp
      tempPosts={tempPosts}
      currentPageState={groupingState('currentPage', currentPage, onChangeCurrentPage)}
      handlePrevPage={handlePrevPage}
      handleNextPage={handleNextPage}
      numberListPage={numberListPage}
      splitedNumberList={splitedNumberList}
    />
  );
}

export default TempContainer;