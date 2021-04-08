import PageTemplate from 'components/Template/PageTemplate';
import SearchPostsContainer from 'containers/SearchPosts';

const SearchPostsPage = (): JSX.Element => {
  return (
    <PageTemplate>
      <SearchPostsContainer />
    </PageTemplate>
  );
}

export default SearchPostsPage;