import { useLocation } from 'react-router';

const usePathName = (): string => {
  const { pathname } = useLocation();
  return pathname;
}

export default usePathName;