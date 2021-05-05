import useNoticeList from 'hooks/notice/useNoticeList';
import { INotice } from 'types/notice.types';
import NoItems from 'components/Common/NoItems';
import NoticeItem from './NoticeItem';

const NoticeList = (): JSX.Element => {
  const { noticeList } = useNoticeList();

  return (
    <>
      {
        noticeList.length > 0 ? noticeList.map((notice: INotice, index: number) => {
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
        }) : <NoItems text={'공지사항이 없습니다.'} />
      }
    </>
  );
}

export default NoticeList;