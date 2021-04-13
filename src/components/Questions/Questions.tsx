import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import NoItems from 'components/Common/NoItems';
import PageNumberList from 'components/Common/PageNumberList';
import PageTitle from 'components/Common/PageTitle';
import ListItem from 'components/Common/Post/ListItem';
import usePosts from 'hooks/post/usePosts';
import { EPost } from 'lib/enum/post';
import { IPost } from 'types/post.types';
import AskButton from './AskButton';

const style = require('./Questions.scss');
const cx: ClassNamesFn = classNames.bind(style);

const Questions = (): JSX.Element => {
  const { 
    questionList,
    currentPage,
    onChangeCurrentPage,
    handlePrevPage,
    handleNextPage,
    numberListPage,
    splitedNumberList,
  } = usePosts(EPost.QUESTION);

  return (
    <div className={cx('Questions')}>
      <PageTitle title='질문 모음' subTitle='질문 목록들이 여기에 표시됩니다.'>
        <AskButton />
      </PageTitle>

      <div className={cx('Questions-List')}>
        {
          questionList.length > 0 ? questionList.map((question: IPost) => {
            return (
              <ListItem
                key={question.idx}
                {...question}
              />
            );
          }) : <NoItems text='작성된 글이 없습니다.' />
        }
      </div>

      <PageNumberList
        currentPage={currentPage}
        onChangeCurrentPage={onChangeCurrentPage}
        numberListPage={numberListPage}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
        pageList={splitedNumberList}
      />
    </div>
  );
};

export default Questions;
