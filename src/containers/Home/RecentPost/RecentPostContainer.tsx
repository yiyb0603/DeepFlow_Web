import { memo } from 'react';
import useRecentPosts from 'hooks/useRecentPosts';
import RecentPost from 'components/Home/RecentPost';
import NoPosts from 'components/Common/Post/NoPosts';

const RecentPostContainer = (): JSX.Element => {
  const { recentPosts } = useRecentPosts();

  return (
    <>
    {
      recentPosts.length > 0 ?
      <RecentPost
        recentPosts={recentPosts}
      />
      :
      <NoPosts />
    }
    </>
  );
};

export default memo(RecentPostContainer);