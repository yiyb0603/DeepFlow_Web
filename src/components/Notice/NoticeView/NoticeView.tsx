import useNoticeByIdx from 'hooks/notice/useNoticeByIdx';
import useDeleteNotice from 'hooks/notice/useDeleteNotice';
import MarkdownRender from 'components/Common/Markdown/MarkdownRender';
import PostTitle from 'components/Common/Post/PostTitle';
import PostViewTemplate from 'components/Common/Post/PostViewTemplate';
import TopInfo from 'components/Common/Post/TopInfo';
import PageLoading from 'components/Common/Loading/PageLoading';

const NoticeView = (): JSX.Element => {
  const { notice } = useNoticeByIdx();
  const { requestDeleteNotice } = useDeleteNotice();

  if (notice === null) {
    return <PageLoading text='공지사항을 불러오는 중입니다.' />
  }

  return (
    <PostViewTemplate>
      <PostTitle
        title={notice.title}
      />

      <TopInfo
        idx={notice.idx}
        createdAt={notice.createdAt}
        user={notice.user}
        modifyLink={`/notice-form/${notice.idx}`}
        requestDeleteQuestion={requestDeleteNotice}
      />

      <MarkdownRender
        contents={notice.contents}
      />
    </PostViewTemplate>
  );
}

export default NoticeView;