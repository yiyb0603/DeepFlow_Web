import { memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import usePostForm from 'hooks/post/usePostForm';
import TagForm from './TagForm';
import TitleForm from './TitleForm';
import TagList from './TagList';
import FormBottom from './FormBottom';
import MarkdownForm from 'components/Common/Markdown/MarkdownForm';
import SubmitModal from 'components/PostForm/SubmitModal';
import Helmet from 'components/Common/Helmet';

const style = require('./PostForm.scss');
const cx: ClassNamesFn = classNames.bind(style);

const PostForm = (): JSX.Element => {
  const {
    title,
    onChangeTitle,

    contents,
    onChangeContents,

    onChangeCategory,

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
    <div className={cx('PostForm')}>
      <Helmet title={'질문 글 작성'} />
      {
        isSubmitModal &&
        <SubmitModal
          title={title}
          introduction={introduction}
          onChangeIntroduction={onChangeIntroduction}
          handleIsModal={handleIsModal}
          requestOfferPost={requestOfferPost}
        />
      }
      <TitleForm
        title={title}
        onChangeTitle={onChangeTitle}
      />

      <div className={cx('PostForm-CategoryTagWrapper')}>
        <div className={cx('PostForm-CategoryTagWrapper-Left')}>
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
        title={title}
        contents={contents}
        onChangeContents={onChangeContents}
      />

      <FormBottom
        handleIsModal={handleIsModal}
        onChangeCategory={onChangeCategory}
        requestOfferPost={requestOfferPost}
      />
    </div>
  );
};

export default memo(PostForm);
