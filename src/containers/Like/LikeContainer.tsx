import PostLike from 'components/Post/PostLike'
import useLike from 'hooks/useLike';

const LikeContainer = (): JSX.Element => {
  const { isPressed, likeList, handlePressLike } = useLike();

  return (
    <PostLike
      isPressed={isPressed}
      likeList={likeList}
      handlePressLike={handlePressLike}
    />
  );
}

export default LikeContainer;