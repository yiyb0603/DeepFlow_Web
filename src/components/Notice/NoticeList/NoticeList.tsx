import NoItems from 'components/Common/NoItems';
import ListItem from 'components/Common/Post/ListItem';
import useNoticeList from 'hooks/notice/useNoticeList';
import { INotice } from 'types/notice.types';

const NoticeList = (): JSX.Element => {
  const { noticeList } = useNoticeList();

  return (
    <>
      {
        noticeList.length > 0 ? noticeList.map((notice: INotice) => {
          const { idx, title, introduction, createdAt, updatedAt } = notice;
          return (
            <ListItem
              key={idx}
              idx={idx}
              title={title}
              introduction={introduction}
              createdAt={createdAt}
              updatedAt={updatedAt}
              thumbnail={''}
            />
          )
        }) : <NoItems text={'공지사항이 없습니다.'} />
      }
    </>
  );
}

export default NoticeList;