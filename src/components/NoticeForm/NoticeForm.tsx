import useNoticeForm from 'hooks/notice/useNoticeForm';
import FormTemplate from 'components/Common/Form';
import FormBottom from 'components/Common/Form/FormBottom';
import MarkdownForm from 'components/Common/Markdown/MarkdownForm';

const NoticeForm = (): JSX.Element => {
  const {
    onChangeIsContentsFocus,
    request,
    onChangeTitle,
    contents,
    onChangeContents,
    requestOfferNotice,
  } = useNoticeForm();

  const { title } = request;

  return (
    <FormTemplate
      title={title}
      onChangeTitle={onChangeTitle}
    >
     <MarkdownForm
        height='80vh'
        onChangeIsFocus={onChangeIsContentsFocus}
        contents={contents}
        onChangeContents={onChangeContents}
     />

      <FormBottom
        onWrite={requestOfferNotice}
      />
    </FormTemplate>
  );
};

export default NoticeForm;