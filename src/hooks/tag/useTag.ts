import { useState, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTagByTagName } from 'lib/api/tag/tag.api';
import { EResponse } from 'lib/enum/response';
import { ITag } from 'types/tag.types';

const useTag = () => {
  const pageParam: { tag: string } = useParams();
  const [tagInfo, setTagInfo] = useState<ITag | null>(null);

  const requestTagInfo = useCallback(async () => {
    try {
      const { status, data: { tag } } = await getTagByTagName(pageParam.tag);

      if (status === EResponse.OK) {
        setTagInfo(tag);
      }
    } catch (error) {
      console.log(error);
    }
  }, [pageParam]);

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