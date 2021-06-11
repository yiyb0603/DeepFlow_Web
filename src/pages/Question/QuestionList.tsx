import QuestionList from 'components/Question/QuestionList';
import PageTemplate from 'components/Common/Base/PageTemplate';

const QuestionListPage = (): JSX.Element => {
  return (
    <PageTemplate>
      <QuestionList />
    </PageTemplate>
  );
}

export default QuestionListPage;