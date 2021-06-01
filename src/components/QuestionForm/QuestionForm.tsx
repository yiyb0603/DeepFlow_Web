import { CSSProperties, memo, useMemo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import useQuestionForm from 'hooks/question/questionHooks/useQuestionForm';
import TagForm from './TagForm';
import TagList from './TagList';
import FormBottom from '../Common/Form/FormBottom';
import MarkdownForm from 'components/Common/Markdown/MarkdownForm';
import SubmitModal from 'components/QuestionForm/SubmitModal';
import Helmet from 'components/Common/Helmet';
import FormTemplate from 'components/Common/Form';
import MarkdownRender from 'components/Common/Markdown/MarkdownRender';

const style = require('./QuestionForm.scss');
const cx: ClassNamesFn = classNames.bind(style);

const QuestionForm = (): JSX.Element => {
  const {
    isLoading,

    onChangeIsContentsFocus,

    title,
    onChangeTitle,

    contents,
    onChangeContents,

    introduction,
    onChangeIntroduction,

    tagInput,
    onChangeTagInput,
    onKeydownTagInput,

    postTags,
    handleFilterPostTag,
    
    requestOfferPost,
    isSubmitModal,
    handleIsModal,
  } = useQuestionForm();

  const renderStyle: CSSProperties = useMemo(() => {
    return {
      flex: 1,
      padding: '0 1rem',
      maxHeight: '75vh',
      overflowX: 'hidden',
      overflowY: 'auto',
    };
  }, []);
  
  return (
    <FormTemplate
      title={title}
      onChangeTitle={onChangeTitle}
    >
      <Helmet title='질문 글 작성' />
      {
        isSubmitModal &&
        <SubmitModal
          title={title}
          introduction={introduction}
          onChangeIntroduction={onChangeIntroduction}
          handleIsModal={handleIsModal}
          isLoading={isLoading}
          requestOfferPost={requestOfferPost}
        />
      }

      <div className={cx('QuestionForm-TagWrapper')}>
        <div className={cx('QuestionForm-TagWrapper-Left')}>
          <TagForm
            postTags={postTags}
            tagInput={tagInput}
            onChangeTagInput={onChangeTagInput}
            onKeydownTagInput={onKeydownTagInput}
            handleFilterPostTag={handleFilterPostTag}
          />
        </div>

        <TagList postTags={postTags} />
      </div>

      <div style={{ display: 'flex' }}>
        <MarkdownForm
          contents={contents}
          onChangeContents={onChangeContents}
          onChangeIsFocus={onChangeIsContentsFocus}
        />

        <MarkdownRender
          contents={contents}
          style={renderStyle}
        />
      </div>

      <FormBottom
        onSave={() => requestOfferPost(true)}
        onWrite={() => handleIsModal(true)}
      />
    </FormTemplate>
  );
};

export default memo(QuestionForm);
