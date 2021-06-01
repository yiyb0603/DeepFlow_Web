import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tagSelector } from 'lib/recoil/selector/tag';
import { ITag } from 'types/tag.types';
import isNullOrUndefined from 'util/isNullOrUndefined';

interface PageParam {
  tag: string;
}

const useTag = () => {
  const pageParam = useParams<PageParam>();
  const [tagInfo, setTagInfo] = useState<ITag | null>(null);

  const tagResponse: ITag = useRecoilValue(tagSelector(pageParam.tag));

  const requestTagInfo = useCallback((): void => {
    if (isNullOrUndefined(tagResponse)) {
      return;
    }

    setTagInfo(tagResponse);
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