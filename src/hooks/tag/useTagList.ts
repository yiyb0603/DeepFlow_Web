import { useCallback, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { tagListState, tagLoadingState } from 'lib/recoil/atom/tag';
import { tagListSelector } from 'lib/recoil/selector/tag';
import { ETagSort } from 'lib/enum/tag';
import useTabState from 'hooks/util/useTabState';
import { ITag } from 'types/tag.types';
import isNullOrUndefined from 'util/isNullOrUndefined';

const useTagList = () => {
  const [tagLoading, setTagLoading] = useRecoilState<boolean>(tagLoadingState);
  const [tagList, setTagList] = useRecoilState<ITag[]>(tagListState);

  const [sortRule, onChangeSortRule] = useTabState<ETagSort>('sort', ETagSort.POPULAR);

  const tagListResponse: ITag[] = useRecoilValue(tagListSelector(sortRule));

  const requestTagList = useCallback((): void => {
    if (isNullOrUndefined(tagListResponse)) {
      return;
    }

    setTagLoading(true);

    setTagList(tagListResponse);
    
    setTagLoading(false);
  }, [setTagList, setTagLoading, tagListResponse]);

  useEffect(() => {
    requestTagList();
  }, [requestTagList, sortRule]);

  return {
    tagLoading,
    sortRule,
    onChangeSortRule,
    tagList,
  };
}

export default useTagList;