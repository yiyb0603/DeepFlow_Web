import { useCallback, useState } from 'react';

const useIsReplyWrite = () => {
  const [isReplyWrite, setIsReplyWrite] = useState<boolean>(false);

  const onChangeIsReplyWrite = useCallback((isReplyWrite?: boolean) => {
    if (isReplyWrite !== undefined) {
      setIsReplyWrite(isReplyWrite);
    } else {
      setIsReplyWrite((prevIsReplyWrite: boolean) => !prevIsReplyWrite);
    }
  }, []);

    return {
      isReplyWrite,
      onChangeIsReplyWrite,
    };
}

export default useIsReplyWrite;