import Notice from "components/Notice";
import { useRecoilValue } from "recoil";
import { getNoticeListState } from "selector/notice";
import { INotice } from "types/notice.types";

const NoticeContainer = (): JSX.Element => {
  const noticeList = useRecoilValue<INotice[]>(getNoticeListState(1));

  return (
    <Notice
      noticeList={noticeList}
    />
  );
};

export default NoticeContainer;