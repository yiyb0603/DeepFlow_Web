import QuestionList from 'components/Question/QuestionList';
import PageTemplate from 'components/Template/PageTemplate';

const QuestionListPage = (): JSX.Element => {
  return (
    <PageTemplate>
      <QuestionList />
    </PageTemplate>
  );
}

export default QuestionListPage;