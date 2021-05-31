import { useParams } from 'react-router-dom';
import { IPageParam } from 'types/question.types';

const usePageParam = (): number => {
  const { idx } = useParams<IPageParam>();
  return Number(idx);
}

export default usePageParam;