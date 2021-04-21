import { useLocation } from 'react-router-dom';

const usePathName = (): string => {
  const { pathname } = useLocation();
  return pathname;
}

export default usePathName;