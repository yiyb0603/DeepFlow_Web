import { memo, useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import RecentPost from 'components/Home/RecentPost';
import { recentPostState } from 'atom/post';
import { getRecentPosts } from 'lib/api/post/post.api';

const RecentPostContainer = (): JSX.Element => {
  const POST_COUNT: number = 6;
  const [recentPosts, setRecentPosts] = useRecoilState(recentPostState);

  const requestRecentPosts = useCallback(async () => {
    try {
      const { data } = await getRecentPosts(POST_COUNT);
      setRecentPosts(data);
    } catch (error) {
      console.log(error);
    }
  }, [setRecentPosts]);

  useEffect(() => {
    requestRecentPosts();
  }, [requestRecentPosts]);

  return (
    <RecentPost
      recentPosts={recentPosts}
    />
  );
};

export default memo(RecentPostContainer);