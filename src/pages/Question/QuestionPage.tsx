import PageTemplate from 'components/Template/PageTemplate';
import QuestionContainer from 'containers/Question';

const QuestionPage = (): JSX.Element => {
  return (
    <PageTemplate>
      <QuestionContainer />
    </PageTemplate>
  );
}

export default QuestionPage;