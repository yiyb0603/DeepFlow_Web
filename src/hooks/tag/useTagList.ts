import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { tagListState, tagLoadingState } from 'atom/tag';
import { getTagList } from 'lib/api/tag/tag.api';
import { ETagSort } from 'lib/enum/tag';
import { EResponse } from 'lib/enum/response';
import useTabState from 'hooks/util/useTabState';
import { ITag } from 'types/tag.types';

const useTagList = () => {
  const [tagLoading, setTagLoading] = useRecoilState<boolean>(tagLoadingState);
  const [tagList, setTagList] = useRecoilState<ITag[]>(tagListState);

  const [sortRule, onChangeSortRule] = useTabState<ETagSort>('sort', ETagSort.POPULAR);

  const requestTagList = useCallback(async (): Promise<void> => {
    try {
      setTagLoading(true);
      const { status, data: { tags } } = await getTagList(sortRule);

      if (status === EResponse.OK) {
        setTagList(tags);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setTagLoading(false);
    }
  }, [setTagList, setTagLoading, sortRule]);

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