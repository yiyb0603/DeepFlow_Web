import PageTemplate from "components/Template/PageTemplate";
import NoticeContainer from "containers/Notice";

const NoticePage = (): JSX.Element => {
  return (
    <PageTemplate>
      <NoticeContainer />
    </PageTemplate>
  );
};

export default NoticePage;