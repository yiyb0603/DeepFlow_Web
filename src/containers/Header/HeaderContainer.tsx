import { memo } from 'react';
import useHeader from 'hooks/useHeader';
import Header from 'components/Common/Header';

const HeaderContainer = (): JSX.Element => {
  const { myInfo, handleLogout } = useHeader();

  return (
    <Header
      myInfo={myInfo}
      handleLogout={handleLogout}
    />
  );
};

export default memo(HeaderContainer);