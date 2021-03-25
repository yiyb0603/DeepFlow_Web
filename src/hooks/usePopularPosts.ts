import { popularPostState } from "atom/post";
import { getPopularPosts } from "lib/api/post/post.api";
import { EResponse } from "lib/enum/response";
import { useCallback, useEffect } from "react";
import { useRecoilState } from "recoil";

const usePopularPosts = () => {
  const POST_COUNT: number = 3;
  const [popularPosts, setPopularPosts] = useRecoilState(popularPostState);

  const requestPopularPosts = useCallback(async (): Promise<void> => {
    try {
      const { status, data: { popularPosts } } = await getPopularPosts(POST_COUNT);

      if (status === EResponse.OK) {
        setPopularPosts(popularPosts);
      }
    } catch (error) {
      console.log(error);
    }
  }, [setPopularPosts]);

  useEffect(() => {
    requestPopularPosts();
  }, [requestPopularPosts]);

  return {
    popularPosts,
  };
}

export default usePopularPosts;