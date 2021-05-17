import { memo, useEffect } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { APP_NAME } from 'constants/util';
import usePopularQuestions from 'hooks/question/usePopularQuestions';
import { IQuestion } from 'types/question.types';
import SectionTitle from '../SectionTitle';
import PopularQuestionItem from './PopularQuestionItem';
import NoPopularItems from '../NoPopularItems';
import ViewMore from '../ViewMore';

const style = require('./PopularQuestion.scss');
const cx: ClassNamesFn = classNames.bind(style);

const PopularQuestion = (): JSX.Element => {
  const { popularQuestions, requestPopularQuestions } = usePopularQuestions();

  useEffect(() => {
    requestPopularQuestions();
  }, [requestPopularQuestions]);

  return (
    <div className={cx('PopularQuestion')}>
      <SectionTitle title={`${APP_NAME}의 인기 질문글`} />

      <div className={cx('PopularQuestion-ContentsWrap')}>
        <div className={cx('PopularQuestion-ContentsWrap-Questions')}>
          {
            popularQuestions.length > 0 ? popularQuestions.map((question: IQuestion, order: number) => {
              const {
                idx,
                title,
                createdAt,
                viewCount,
                commentCount,
                replyCount,
                likeCount,
              } = question;

              return (
                <PopularQuestionItem
                  key={idx}
                  idx={idx}
                  order={order + 1}
                  title={title}
                  viewCount={viewCount}
                  commentCount={commentCount}
                  replyCount={replyCount}
                  likeCount={likeCount}
                  createdAt={createdAt}
                />
              );
            }) : <NoPopularItems title='현재 인기글이 없습니다.' />
          }
        </div>

        <ViewMore link='/questions?sort=popular' />
      </div>
    </div>
  );
};

export default memo(PopularQuestion);