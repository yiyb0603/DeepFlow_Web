import { useCallback, useMemo } from 'react';
import FadeIn from 'react-fade-in';
import { historySingleton } from 'lib/singleton/history';
import { checkLoggedIn } from 'util/checkLoggedIn';
import { getMyInfo } from 'util/getMyInfo';
import { IToken } from 'types/user.types';
import { palette } from 'styles/Palette/Palette';
import PageTitle from 'components/Common/PageTitle';
import Helmet from 'components/Common/Helmet';
import Button from 'components/Common/Button';
import NoticeList from './NoticeList';

const NoticeTemplate = (): JSX.Element => {
  const myInfo: IToken = useMemo(() => getMyInfo(), []);
  
  const handlePushToForm = useCallback((): void => {
    if (!checkLoggedIn()) {
      return;
    }

    historySingleton.push('/notice-form');
  }, []);

  return (
    <FadeIn>
      <Helmet title='공지사항' />
      <PageTitle title='공지사항' subTitle='공지사항 목록이 여기에 표시됩니다.'>
        {
          (myInfo && myInfo.isAdmin) &&
          <Button
            width={'100px'}
            height={'35px'}
            backgroundColor={palette.main}
            color={palette.white}
            handleClick={handlePushToForm}
          >
            작성하기
          </Button>
        }
      </PageTitle>
      
      <NoticeList />
    </FadeIn>
  );
};

export default NoticeTemplate;