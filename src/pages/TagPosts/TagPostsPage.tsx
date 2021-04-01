import PageTemplate from 'components/Template/PageTemplate';
import TagPostsContainer from 'containers/TagPosts';

const TagPostsPage = (): JSX.Element => {
  return (
    <PageTemplate>
      <TagPostsContainer />
    </PageTemplate>
  );
}

export default TagPostsPage;