import { useEffect } from 'react';
import usePosts from 'hooks/usePosts';
import Temp from 'components/Temp';

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
      currentPage={currentPage}
      onChangeCurrentPage={onChangeCurrentPage}
      handlePrevPage={handlePrevPage}
      handleNextPage={handleNextPage}
      numberListPage={numberListPage}
      pageList={splitedNumberList}
    />
  );
}

export default TempContainer;