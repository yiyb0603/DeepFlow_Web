import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import usePosts from 'hooks/post/usePosts';
import { EPost } from 'lib/enum/post';
import { IPost } from 'types/post.types';
import useViewMode from 'hooks/post/useViewMode';
import { EView } from 'lib/enum/theme';
import Helmet from 'components/Common/Helmet';
import NoItems from 'components/Common/NoItems';
import PageNumberList from 'components/Common/Post/PageNumberList';
import PageTitle from 'components/Common/PageTitle';
import ListItem from 'components/Common/Post/ListItem';
import HomeLoading from 'components/Home/HomeLoading';
import AskButton from './AskButton';
import SelectViewMode from 'components/Common/Post/SelectViewMode';
import GridItem from 'components/Common/Post/GridItem';

const style = require('./Questions.scss');
const cx: ClassNamesFn = classNames.bind(style);

const Questions = (): JSX.Element => {
  const {
    postLoading,
    questionList,
    currentPage,
    onChangeCurrentPage,
    handlePrevPage,
    handleNextPage,
    numberListPage,
    splitedNumberList,
  } = usePosts(EPost.QUESTION);
  const { viewMode, onChangeViewMode, flexStyle } = useViewMode();

  return (
    <>
    {
      postLoading && questionList.length <= 0 ? <HomeLoading />
      :
      <div className={cx('Questions')}>
        <Helmet title='질문 모음' />
        <PageTitle title='질문 모음' subTitle='질문 목록들이 여기에 표시됩니다.'>
          <AskButton />
        </PageTitle>

        <SelectViewMode
          viewMode={viewMode}
          onChangeViewMode={onChangeViewMode}
        />

        <div className={cx('Questions-List')} style={flexStyle}>
          {
            questionList.length > 0 ? questionList.map((question: IPost) => {
              return (
                <>
                {
                  viewMode === EView.LIST ?
                  <ListItem
                    key={question.idx}
                    {...question}
                  /> :
                  <GridItem
                    key={question.idx}
                    {...question}
                  />
                }
                </>
              );
            }) : <NoItems text='작성된 글이 없습니다.' />
          }
        </div>

        {
          splitedNumberList.length > 1 &&
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
    }
    </>
  );
};

export default Questions;
