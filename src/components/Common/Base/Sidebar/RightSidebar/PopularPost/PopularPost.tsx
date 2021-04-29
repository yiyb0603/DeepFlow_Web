import { memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { APP_NAME } from 'constants/util';
import usePopularPosts from 'hooks/post/usePopularPosts';
import { IPost } from 'types/post.types';
import SectionTitle from '../SectionTitle';
import PopularItem from './PopularItem';
import NoPopularItems from '../NoPopularItems';
import ViewMore from '../ViewMore';

const style = require('./PopularPost.scss');
const cx: ClassNamesFn = classNames.bind(style);

const PopularPost = (): JSX.Element => {
  const { popularPosts } = usePopularPosts();

  return (
    <div className={cx('PopularPost')}>
      <SectionTitle title={`${APP_NAME}의 인기 질문글`} />

      <div className={cx('PopularPost-ContentsWrap')}>
        <div className={cx('PopularPost-ContentsWrap-Posts')}>
          {
            popularPosts.length > 0 ? popularPosts.map((post: IPost, order: number) => {
              const { idx, title, createdAt, viewCount, commentCount, replyCount, likeCount } = post;

              return (
                <PopularItem
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

export default memo(PopularPost);