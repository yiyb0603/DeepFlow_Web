import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { IPost } from 'types/post.types';
import PageTitle from 'components/Common/PageTitle';
import ListItem from 'components/Common/Post/ListItem';
import PageNumberList from 'components/Common/PageNumberList';
import NoItems from 'components/Common/NoItems';
import { IPagination } from 'types/pagination.types';

const style = require('./Temp.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface TempProps extends IPagination {
  tempPosts: IPost[];
}

const Temp = ({
  tempPosts,
  currentPageState,
  numberListPage,
  handlePrevPage,
  handleNextPage,
  splitedNumberList,
}: TempProps): JSX.Element => {
  const { currentPage, onChangeCurrentPage } = currentPageState;

  return (
    <div className={cx('Temp')}>
      <PageTitle
        title='임시저장 글 목록'
        subTitle='임시저장 글 목록이 여기에 표시됩니다.'
      />

      <div className={cx('Temp-List')}>
        {
          tempPosts.length > 0 ? tempPosts.map((post: IPost) => (
            <ListItem
              key={post.idx}
              {...post}
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
