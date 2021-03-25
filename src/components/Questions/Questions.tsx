import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import PageTitle from 'components/Common/PageTitle';
import ListItem from 'components/Common/Post/ListItem';
import { IPost } from 'types/post.types';
import AskButton from './AskButton';

const style = require('./Questions.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface QuestionsProps {
  questionList: IPost[];
}

const Questions = ({ questionList }: QuestionsProps): JSX.Element => {
  return (
    <div className={cx('Questions')}>
      <PageTitle title='질문 모음' subTitle='질문 목록들이 여기에 표시됩니다.'>
        <AskButton />
      </PageTitle>

      <div className={cx('Questions-List')}>
        {
          questionList.map((question: IPost) => {
            const {
              idx,
              title,
              introduction,
              thumbnail,
              postTags,
              viewCount,
              commentCount,
              likeCount,
              createdAt,
              updatedAt,
              user,
            } = question;

            return (
              <ListItem
                key={idx}
                idx={idx}
                title={title}
                introduction={introduction}
                thumbnail={thumbnail}
                postTags={postTags}
                createdAt={createdAt}
                updatedAt={updatedAt}
                viewCount={viewCount}
                commentCount={commentCount}
                likeCount={likeCount}
                user={user}
              />
            );
          })
        }
      </div>
    </div>
  );
};

export default Questions;
