import { memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import usePostForm from 'hooks/post/usePostForm';
import TagForm from './TagForm';
import TagList from './TagList';
import FormBottom from '../Common/Form/FormBottom';
import MarkdownForm from 'components/Common/Markdown/MarkdownForm';
import SubmitModal from 'components/PostForm/SubmitModal';
import Helmet from 'components/Common/Helmet';
import FormTemplate from 'components/Common/Form';

const style = require('./PostForm.scss');
const cx: ClassNamesFn = classNames.bind(style);

const PostForm = (): JSX.Element => {
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
  } = usePostForm();
  
  return (
    <FormTemplate
      title={title}
      onChangeTitle={onChangeTitle}
    >
      <Helmet title={'질문 글 작성'} />
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

      <div className={cx('PostForm-TagWrapper')}>
        <div className={cx('PostForm-TagWrapper-Left')}>
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

      <MarkdownForm
        contents={contents}
        onChangeContents={onChangeContents}
        onChangeIsFocus={onChangeIsContentsFocus}
      />

      <FormBottom
        onSave={() => requestOfferPost(true)}
        onWrite={() => handleIsModal(true)}
      />
    </FormTemplate>
  );
};

export default memo(PostForm);
