import { useCallback, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { tagListState, tagSortState } from 'atom/tag';
import { getTagList } from 'lib/api/tag/tag.api';
import { ETagSort } from 'lib/enum/tag';
import { ITag } from 'types/tag.types';
import { EResponse } from 'lib/enum/response';

const useTagList = () => {
  const [sortRule, setSortRule] = useRecoilState<ETagSort>(tagSortState);
  const [tagList, setTagList] = useRecoilState<ITag[]>(tagListState);

  const requestTagList = useCallback(async (): Promise<void> => {
    try {
      const { status, data: { tags } } = await getTagList(sortRule);

      if (status === EResponse.OK) {
        setTagList(tags);
      }
    } catch (error) {
      console.log(error);
    }
  }, [setTagList, sortRule]);

  useEffect(() => {
    requestTagList();
  }, [requestTagList, sortRule]);

  return {
    sortRule,
    setSortRule,
    tagList,
  };
}

export default useTagList;