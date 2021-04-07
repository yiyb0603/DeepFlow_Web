import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { IPost } from 'types/post.types';
import PageTitle from 'components/Common/PageTitle';
import ListItem from 'components/Common/Post/ListItem';
import PageNumberList, { PageNumberListProps } from 'components/Common/PageNumberList/PageNumberList';
import NoItems from 'components/Common/NoItems';

const style = require('./Temp.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface TempProps extends PageNumberListProps {
  tempPosts: IPost[];
  pageList: number[][];
}

const Temp = ({
  tempPosts,
  currentPage,
  onChangeCurrentPage,
  numberListPage,
  handlePrevPage,
  handleNextPage,
  pageList,
}: TempProps): JSX.Element => {
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
          pageList={pageList}
        />
      }
    </div>
  );
};

export default Temp;
