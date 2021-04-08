import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import PageNumberList from 'components/Common/PageNumberList';
import PageTitle from 'components/Common/PageTitle';
import ListItem from 'components/Common/Post/ListItem';
import { IPagination } from 'types/pagination.types';
import { IPost } from 'types/post.types';
import AskButton from './AskButton';

const style = require('./Questions.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface QuestionsProps extends IPagination {
  questionList: IPost[];
}

const Questions = ({
  questionList,
  currentPageState,
  handlePrevPage,
  handleNextPage,
  numberListPage,
  splitedNumberList,
}: QuestionsProps): JSX.Element => {
  const { currentPage, onChangeCurrentPage } = currentPageState;

  return (
    <div className={cx('Questions')}>
      <PageTitle title='질문 모음' subTitle='질문 목록들이 여기에 표시됩니다.'>
        <AskButton />
      </PageTitle>

      <div className={cx('Questions-List')}>
        {
          questionList.map((question: IPost) => {
            return (
              <ListItem
                key={question.idx}
                {...question}
              />
            );
          })
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
