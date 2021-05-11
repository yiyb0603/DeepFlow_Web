import useNoticeByIdx from 'hooks/notice/useNoticeByIdx';
import useDeleteNotice from 'hooks/notice/useDeleteNotice';
import MarkdownRender from 'components/Common/Markdown/MarkdownRender';
import PostTitle from 'components/Common/Post/PostTitle';
import PostViewTemplate from 'components/Common/Post/PostViewTemplate';
import TopInfo from 'components/Common/Post/TopInfo';

const NoticeView = (): JSX.Element => {
  const { notice } = useNoticeByIdx();
  const { requestDeleteNotice } = useDeleteNotice();

  return (
    <>
    {
      notice !== null &&
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
    }
    </>
  );
}

export default NoticeView;