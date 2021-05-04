import { useCallback, useState } from 'react';

const useFocus = () => {
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const onChangeIsFocus = useCallback((): void => {
    setIsFocus((prevIsFocus: boolean) => !prevIsFocus);
  }, []);

  return [
    isFocus,
    onChangeIsFocus,
  ] as const;
}

export default useFocus;