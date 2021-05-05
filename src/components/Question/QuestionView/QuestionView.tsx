import useQuestionByIdx from 'hooks/question/useQuestionByIdx';
import { getGithubAddress } from 'util/getGithubAddress';
import Comment from 'components/Comment';
import Helmet from 'components/Common/Helmet';
import MarkdownRender from 'components/Common/Markdown/MarkdownRender';
import PageLoading from 'components/Common/Loading/PageLoading';
import PostTitle from 'components/Common/Post/PostTitle';
import PostViewTemplate from 'components/Common/Post/PostViewTemplate';
import TopInfo from 'components/Common/Post/TopInfo';
import PostLike from './PostLike';
import PostTags from './PostTags';
import Thumbnail from './Thumbnail';
import PostUserInfo from './PostUserInfo';

const QuestionView = (): JSX.Element => {
  const { question, requestDeleteQuestion } = useQuestionByIdx();

  return (
    <>
    {
      question === null ? <PageLoading text='글을 불러오는 중입니다 🥴' />
      :
      <PostViewTemplate>
        <Helmet
          title={question.title}
          description={question.introduction}
          favicon={question.thumbnail}
        />

        <PostTitle
          title={question.title}
        />

        <TopInfo
          idx={question.idx}
          createdAt={question.createdAt}
          user={question.user}
          modifyLink={`/question-form/${question.idx}`}
          requestDeleteQuestion={requestDeleteQuestion}
        />

        <PostTags
          postTags={question.postTags}
        />
        
        <Thumbnail
          thumbnail={question.thumbnail!}
        />

        <MarkdownRender
          contents={question.contents!}
        />

        <PostLike />

        <PostUserInfo
          idx={question.user.idx}
          avatar={question.user.avatar}
          name={question.user.name}
          description={question.user.description}
          blog={question.user.blog}
          github={getGithubAddress(question.user.githubId)}
          location={question.user.location}
        />

        <Comment />
      </PostViewTemplate>
    }
    </>
  );
};

export default QuestionView;
