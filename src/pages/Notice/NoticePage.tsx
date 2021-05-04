import NoticeTemplate from 'components/Notice';
import PageTemplate from 'components/Template/PageTemplate';

const NoticePage = (): JSX.Element => {
  return (
    <PageTemplate>
      <NoticeTemplate />
    </PageTemplate>
  );
};

export default NoticePage;