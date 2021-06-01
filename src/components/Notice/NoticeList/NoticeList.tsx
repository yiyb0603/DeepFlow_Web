import useNoticeList from 'hooks/notice/useNoticeList';
import { INotice } from 'types/notice.types';
import NoItems from 'components/Common/NoItems';
import NoticeItem from './NoticeItem';
import isEmpty from 'util/isEmpty';

const NoticeList = (): JSX.Element => {
  const { noticeList } = useNoticeList();

  if (!noticeList || isEmpty(noticeList)) {
    return <NoItems text='공지사항이 없습니다.' />;
  }

  return (
    <>
      {
        noticeList.map((notice: INotice, index: number) => {
          const { idx, title, createdAt, updatedAt, user, viewCount } = notice;
          return (
            <NoticeItem
              key={idx}
              idx={idx}
              order={index + 1}
              title={title}
              createdAt={createdAt}
              updatedAt={updatedAt}
              user={user}
              viewCount={viewCount}
            />
          )
        })
      }
    </>
  );
}

export default NoticeList;