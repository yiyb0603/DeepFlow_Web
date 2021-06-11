import NoticeTemplate from 'components/Notice';
import PageTemplate from 'components/Common/Base/PageTemplate';

const NoticeListPage = (): JSX.Element => {
  return (
    <PageTemplate>
      <NoticeTemplate />
    </PageTemplate>
  );
}

export default NoticeListPage;