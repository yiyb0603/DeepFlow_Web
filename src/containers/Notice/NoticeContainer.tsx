import useNoticeList from 'hooks/useNoticeList';
import Notice from 'components/Notice';

const NoticeContainer = (): JSX.Element => {
  const { noticeList } = useNoticeList();

  return (
    <Notice
      noticeList={noticeList}
    />
  );
};

export default NoticeContainer;