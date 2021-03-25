import usePopularPosts from 'hooks/usePopularPosts';
import RightSidebar from 'components/Common/Sidebar/RightSidebar';

const RightSidebarContainer = (): JSX.Element => {
  const { popularPosts } = usePopularPosts();

  return (
    <RightSidebar
      popularPosts={popularPosts}
    />
  );
};

export default RightSidebarContainer;