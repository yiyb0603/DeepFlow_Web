import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { tagListState, tagLoadingState, tagSortState } from 'atom/tag';
import { getTagList } from 'lib/api/tag/tag.api';
import { ETagSort } from 'lib/enum/tag';
import { ITag } from 'types/tag.types';
import { EResponse } from 'lib/enum/response';

const useTagList = () => {
  const [tagLoading, setTagLoading] = useRecoilState<boolean>(tagLoadingState);
  const [sortRule, setSortRule] = useRecoilState<ETagSort>(tagSortState);
  const [tagList, setTagList] = useRecoilState<ITag[]>(tagListState);

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
    setSortRule,
    tagList,
  };
}

export default useTagList;