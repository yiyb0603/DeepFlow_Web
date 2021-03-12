import { useRecoilState, useRecoilValue } from "recoil";
import { getNoticeListState } from "selector/notice";
import { postPageState } from "atom/post";
import Notice from "components/Notice";
import { INotice } from "types/notice.types";

const NoticeContainer = (): JSX.Element => {
  const [page, setPage] = useRecoilState<number>(postPageState);
  const noticeList = useRecoilValue<INotice[]>(getNoticeListState(page));

  return (
    <Notice
      noticeList={noticeList}
    />
  );
};

export default NoticeContainer;