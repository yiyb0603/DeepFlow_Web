import PageTemplate from 'components/Template/PageTemplate';
import SearchPosts from 'components/SearchPosts';

const SearchPostsPage = (): JSX.Element => {
  return (
    <PageTemplate>
      <SearchPosts />
    </PageTemplate>
  );
}

export default SearchPostsPage;