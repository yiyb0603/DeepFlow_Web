import { useEffect } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import usePosts from 'hooks/post/usePosts';
import usePostByIdx from 'hooks/post/usePostByIdx';
import useTempPosts from 'hooks/post/useTempPosts';
import { IQuestion } from 'types/post.types';
import PageTitle from 'components/Common/PageTitle';
import ListItem from 'components/Common/Post/ListItem';
import PageNumberList from 'components/Common/Post/PageNumberList';
import NoItems from 'components/Common/NoItems';
import Helmet from 'components/Common/Helmet';

const style = require('./Temp.scss');
const cx: ClassNamesFn = classNames.bind(style);

const Temp = (): JSX.Element => {
  const {
    currentPage,
    onChangeCurrentPage,
    handlePrevPage,
    handleNextPage,
    numberListPage,
    splitedNumberList,
  } = usePosts();
  const { tempPosts, requestTempPosts } = useTempPosts();
  const { requestDeleteQuestion } = usePostByIdx();

  useEffect(() => {
    requestTempPosts();
  }, [requestTempPosts]);

  return (
    <div className={cx('Temp')}>
      <Helmet title='임시저장' />
      <PageTitle
        title='임시저장 글 목록'
        subTitle='임시저장 글 목록이 여기에 표시됩니다.'
      />

      <div className={cx('Temp-List')}>
        {
          tempPosts.length > 0 ? tempPosts.map((post: IQuestion) => (
            <ListItem
              key={post.idx}
              {...post}
              requestDeletePost={requestDeleteQuestion}
            />
          )) : <NoItems text='임시저장글이 없습니다.' />
        }
      </div>

      {
        tempPosts.length > 0 &&
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

export default Temp;
