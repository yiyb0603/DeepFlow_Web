import { Fragment, useEffect } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import FadeIn from 'react-fade-in';
import useQuestions from 'hooks/question/questionHooks/useQuestions';
import useViewMode from 'hooks/question/useViewMode';
import { EView } from 'lib/enum/theme';
import { IQuestionTab, sortPostTabs } from 'lib/models/tabs/postTabs';
import { IQuestion } from 'types/question.types';
import Helmet from 'components/Common/Helmet';
import NoItems from 'components/Common/NoItems';
import PageNumberList from 'components/Common/Post/PageNumberList';
import PageTitle from 'components/Common/PageTitle';
import ListItem from 'components/Common/Post/ListItem';
import HomeLoading from 'components/Home/HomeLoading';
import SelectViewMode from 'components/Common/Post/SelectViewMode';
import GridItem from 'components/Common/Post/GridItem';
import SelectTab from 'components/Common/SelectTab';
import AskButton from '../AskButton';
import isEmpty from 'util/isEmpty';

const style = require('./QuestionList.scss');
const cx: ClassNamesFn = classNames.bind(style);

const QuestionList = (): JSX.Element => {
  const {
    questionLoading,
    questionList,
    
    currentPage,
    onChangeCurrentPage,
    handlePrevPage,
    handleNextPage,

    numberListPage,
    splitedNumberList,

    sortTab,
    onChangeSortTab,

    requestQuestionList,
  } = useQuestions();

  const { viewMode, onChangeViewMode, flexStyle } = useViewMode();

  useEffect(() => {
    requestQuestionList();
  }, [sortTab, currentPage, requestQuestionList]);

  if (questionLoading && isEmpty(questionList)) {
    return <HomeLoading />;
  }

  return (
    <div className={cx('QuestionList')}>
      <FadeIn>
        <Helmet title='질문 모음' />
        <PageTitle title='질문 모음' subTitle='질문 목록들이 여기에 표시됩니다.'>
          <AskButton />
        </PageTitle>

        <div className={cx('QuestionList-TabViewWrapper')}>
          <div className={cx('QuestionList-TabViewWrapper-Tab')}>
            {
              sortPostTabs.map(({ name, route }: IQuestionTab, idx: number) => (
                <SelectTab
                  key={idx}
                  name={name}
                  route={route}
                  selectTab={sortTab}
                  onChangeSelectTab={onChangeSortTab}
                  type='Short'
                />
              ))
            }
          </div>

          <SelectViewMode
            viewMode={viewMode}
            onChangeViewMode={onChangeViewMode}
          />
        </div>

        <div style={flexStyle}>
          {
            questionList.length > 0 ? questionList.map((question: IQuestion) => {
              return (
                <Fragment key={question.idx}>
                {
                  viewMode === EView.LIST ?
                  <ListItem
                    {...question}
                  /> :
                  <GridItem
                    {...question}
                  />
                }
                </Fragment>
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
      </FadeIn>
    </div>
  );
};

export default QuestionList;
