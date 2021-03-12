import { useRecoilValue } from "recoil";
import RecentPost from "components/Home/RecentPost";
import { getRecentPostsState } from "selector/post";
import { IPost } from "types/post.types";

const RecentPostContainer = (): JSX.Element => {
  const POST_COUNT: number = 6;
  const recentPosts = useRecoilValue<IPost[]>(getRecentPostsState(POST_COUNT));

  return (
    <RecentPost
      recentPosts={recentPosts}
    />
  );
};

export default RecentPostContainer;