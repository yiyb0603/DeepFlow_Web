import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { IPost } from 'types/post.types';
import PopularItem from './PopularItem';
import PopularTitle from './PopularTitle';

const style = require('./RightSidebar.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface RightSidebarProps {
  popularPosts: IPost[];
}

const RightSidebar = ({ popularPosts }: RightSidebarProps): JSX.Element => {
  console.log(popularPosts);

  return (
    <div className={cx('RightSidebar')}>
      <PopularTitle />

      <div className={cx('RightSidebar-Posts')}>
        {
          popularPosts.map((post: IPost, order: number) => {
            const { idx, title, createdAt, viewCount, commentCount, likeCount } = post;

            return (
              <PopularItem
                key={idx}
                idx={idx}
                order={order + 1}
                title={title}
                viewCount={viewCount}
                commentCount={commentCount}
                likeCount={likeCount}
                createdAt={createdAt}
              />
            );
          })
        }
      </div>
    </div>
  );
};

export default RightSidebar;
