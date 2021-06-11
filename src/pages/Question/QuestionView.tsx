import ScrollProgress from 'components/Common/Base/ScrollProgress';
import QuestionView from 'components/Question/QuestionView';
import PageTemplate from 'components/Common/Base/PageTemplate';

const QuestionViewPage = (): JSX.Element => {
  return (
    <PageTemplate>
      <ScrollProgress />
      <QuestionView />
    </PageTemplate>
  );
}

export default QuestionViewPage;