import NoticeTemplate from 'components/Notice';
import PageTemplate from 'components/Template/PageTemplate';

const NoticeListPage = (): JSX.Element => {
  return (
    <PageTemplate>
      <NoticeTemplate />
    </PageTemplate>
  );
}

export default NoticeListPage;