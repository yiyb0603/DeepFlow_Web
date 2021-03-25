import Questions from 'components/Questions';
import usePosts from 'hooks/usePosts';
import { EPost } from 'lib/enum/post';

const QuestionContainer = (): JSX.Element => {
  const { questionList } = usePosts(EPost.QUESTION);

  return (
    <Questions
      questionList={questionList}
    />
  );
}

export default QuestionContainer;