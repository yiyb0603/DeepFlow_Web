import { memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import useSearchPosts from 'hooks/post/useSearchPosts';
import { IPost } from 'types/post.types';
import PageNumberList from 'components/Common/Post/PageNumberList';
import PageTitle from 'components/Common/PageTitle';
import ListItem from 'components/Common/Post/ListItem';
import NoItems from 'components/Common/NoItems';
import Helmet from 'components/Common/Helmet';
import SearchBar from './SearchBar';

const style = require('./SearchPosts.scss');
const cx: ClassNamesFn = classNames.bind(style);

const SearchPosts = (): JSX.Element => {
  const {
    keyword,
    onChangeKeyword,
    onKeydownKeyword,
    handlePushToSearch,
    searchPosts,
    currentPage,
    onChangeCurrentPage,
    handlePrevPage,
    handleNextPage,
    numberListPage,
    splitedNumberList,
  } = useSearchPosts();

  return (
    <div className={cx('SearchPosts')}>
      <Helmet title='글 목록 검색' />
      <PageTitle
        title='글 목록 검색'
        subTitle='글을 검색하여 조회할 수 있습니다.'
      />

      <SearchBar
        handlePushToSearch={handlePushToSearch}
        onKeydownKeyword={onKeydownKeyword}
        keyword={keyword}
        onChangeKeyword={onChangeKeyword}
      />

      <div className={cx('SearchPosts')}>
        {
          searchPosts.length > 0 ? searchPosts.map((post: IPost) => (
            <ListItem
              key={post.idx}
              {...post}
            />
          )) : <NoItems text='검색한 글이 없습니다.' />
        }
      </div>

      {
        searchPosts.length > 0 &&
        <PageNumberList
          currentPage={currentPage}
          onChangeCurrentPage={onChangeCurrentPage}
          numberListPage={numberListPage}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          pageList={splitedNumberList}
        />
      }
    </div>
  );
};

export default memo(SearchPosts);