import { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react';
import { SetterOrUpdater, useRecoilState, useSetRecoilState } from 'recoil';
import { searchKeywordState, showSearchHistoryState } from 'atom/search';
import { customTrim } from 'converter/customTrim';
import { getPostsBySearch } from 'lib/api/post/post.api';
import { EPost } from 'lib/enum/post';
import { EResponse } from 'lib/enum/response';
import { setStorage } from 'lib/Storage';
import { IPost } from 'types/post.types';
import { ISearchKeyword } from 'types/search.types';
import usePagination from './util/usePagination';

const useSearchPosts = () => {
  const {
    setTotalPage,
    currentPage,
    onChangeCurrentPage,
    handlePrevPage,
    handleNextPage,
    numberListPage,
    splitedNumberList,
  } = usePagination();

  const [keyword, setKeyword] = useState<string>('');
  const [category, setCategory] = useState<EPost>(EPost.QUESTION);
  const [searchPosts, setSearchPosts] = useState<IPost[]>([]);

  const setShowHistory: SetterOrUpdater<boolean> = useSetRecoilState<boolean>(showSearchHistoryState);
  const [searchKeywords, setSearchKeywords] = useRecoilState<ISearchKeyword[]>(searchKeywordState);

  const handleSaveKeywords = useCallback((): void => {
    const nextData: ISearchKeyword = {
      idx: searchKeywords.length > 0 ? searchKeywords[searchKeywords.length - 1].idx + 1 : 0,
      keyword,
    };

    const concatData: ISearchKeyword[] = [...searchKeywords, nextData];
    
    setSearchKeywords(concatData);
    setStorage('keywords', JSON.stringify(concatData));
  }, [keyword, searchKeywords, setSearchKeywords]);

  const requestSearchPosts = useCallback(async (): Promise<void> => {
    try {
      if (!customTrim(keyword)) {
        return;
      }

      handleSaveKeywords();
      const { status, data: { totalPage, posts } } = await getPostsBySearch(keyword, category);

      if (status === EResponse.OK) {
        setShowHistory(false);
        setTotalPage(totalPage!);
        setSearchPosts(posts);
      }
    } catch (error) {
      console.log(error);
    }
  }, [category, handleSaveKeywords, keyword, setShowHistory, setTotalPage]);

  const onChangeKeyword = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setKeyword(value);
  }, []);

  const onKeydownKeyword = useCallback(({ key }: KeyboardEvent<HTMLInputElement>): void => {
    if (key === 'Enter') {
      requestSearchPosts();
    }
  }, [requestSearchPosts]);

  const onChangeCategory = useCallback((category: EPost): void => {
    setCategory(category);
  }, []);

  return {
    keyword,
    onChangeKeyword,
    onKeydownKeyword,

    category,
    onChangeCategory,

    searchPosts,
    currentPage,
    onChangeCurrentPage,
    handlePrevPage,
    handleNextPage,

    numberListPage,
    splitedNumberList,
  };
}

export default useSearchPosts;