import { useLocation } from 'react-router';
import queryString, { ParsedQuery } from 'query-string';

const useQueryString = (): ParsedQuery<string> => {
  const { search } = useLocation();
  const query: ParsedQuery<string> = queryString.parse(search);

  return query;
}

export default useQueryString;