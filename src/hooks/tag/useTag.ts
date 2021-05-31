import { tagSelector } from 'lib/recoil/selector/tag';
import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { ITag, ITagResponse } from 'types/tag.types';
import isNullOrUndefined from 'util/isNullOrUndefined';

const useTag = () => {
  const pageParam: { tag: string } = useParams();
  const [tagInfo, setTagInfo] = useState<ITag | null>(null);

  const tagResponse: ITagResponse = useRecoilValue(tagSelector(pageParam.tag));

  const requestTagInfo = useCallback((): void => {
    if (isNullOrUndefined(tagResponse.data)) {
      return;
    }

    const { tag } = tagResponse.data;
    setTagInfo(tag);
  }, [tagResponse]);

  useEffect(() => {
    if (pageParam.tag) {
      requestTagInfo();
    }
  }, [pageParam, requestTagInfo]);

  return {
    pageParam,
    tagInfo,
  };
}

export default useTag;