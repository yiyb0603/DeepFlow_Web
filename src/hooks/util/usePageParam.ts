import { useParams } from 'react-router-dom';
import { IPageParam } from 'types/post.types';

const usePageParam = (): number => {
  const { idx }: IPageParam = useParams();
  return Number(idx);
}

export default usePageParam;