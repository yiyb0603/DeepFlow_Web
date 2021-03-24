import { memo } from 'react';
import useRecentPosts from 'hooks/useRecentPosts';
import RecentPost from 'components/Home/RecentPost';

const RecentPostContainer = (): JSX.Element => {
  const { recentPosts } = useRecentPosts();

  return (
    <RecentPost
      recentPosts={recentPosts}
    />
  );
};

export default memo(RecentPostContainer);