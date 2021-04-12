import { ChangeEvent, KeyboardEvent, useCallback, useEffect, useState } from 'react';
import { SetterOrUpdater, useRecoilState, useSetRecoilState } from 'recoil';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import { searchCategoryState, searchKeywordListState, searchKeywordState, showSearchHistoryState } from 'atom/search';
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
  const history: History = useHistory();

  const [searchPosts, setSearchPosts] = useState<IPost[]>([]);

  const [keyword, setKeyword] = useRecoilState<string>(searchKeywordState);
  const [category, setCategory] = useRecoilState<EPost>(searchCategoryState);
  const setShowHistory: SetterOrUpdater<boolean> = useSetRecoilState<boolean>(showSearchHistoryState);
  const [searchKeywords, setSearchKeywords] = useRecoilState<ISearchKeyword[]>(searchKeywordListState);

  const handleSaveKeywords = useCallback((keyword: string, category: EPost): void => {
    const nextData: ISearchKeyword = {
      idx: searchKeywords.length > 0 ? searchKeywords[searchKeywords.length - 1].idx + 1 : 0,
      category,
      keyword,
    };

    const concatData: ISearchKeyword[] = [...searchKeywords, nextData];
    
    setSearchKeywords(concatData);
    setStorage('keywords', JSON.stringify(concatData));
  }, [searchKeywords, setSearchKeywords]);

  const requestSearchPosts = useCallback(async (keyword: string, category: EPost): Promise<void> => {
    try {
      if (!customTrim(keyword)) {
        return;
      }

      handleSaveKeywords(keyword, category);

      const { status, data: { totalPage, posts } } = await getPostsBySearch(keyword, category);

      if (status === EResponse.OK) {
        setShowHistory(false);
        setTotalPage(totalPage!);
        setSearchPosts(posts);
      }
    } catch (error) {
      console.log(error);
    }
  }, [handleSaveKeywords, setShowHistory, setTotalPage]);

  const handlePushToSearch = useCallback((keyword: string, category: EPost): void => {
    history.push(`?keyword=${keyword}&category=${category}`);
    setKeyword(keyword);
    setCategory(category);
    requestSearchPosts(keyword, category);
  }, [history, requestSearchPosts, setCategory, setKeyword]);

  const onChangeKeyword = useCallback((e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setKeyword(value);
  }, [setKeyword]);

  const onKeydownKeyword = useCallback((e: KeyboardEvent<HTMLInputElement>): void => {
    const { key } = e;
    if (key === 'Enter') {
      handlePushToSearch(keyword, category);
    }
  }, [category, keyword, handlePushToSearch]);

  const onChangeCategory = useCallback((category: EPost): void => {
    setCategory(category);
  }, [setCategory]);

  useEffect(() => {
    requestSearchPosts(keyword, category);

    return () => {
      setKeyword('');
      setCategory(EPost.QUESTION);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    keyword,
    onChangeKeyword,
    onKeydownKeyword,

    category,
    onChangeCategory,

    handlePushToSearch,

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