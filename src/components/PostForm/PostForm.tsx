import { memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import MarkdownForm from 'components/Common/Markdown/MarkdownForm';
import PostFormProps from './PostForm.props';
import TagForm from './TagForm';
import TitleForm from './TitleForm';
import TagList from './TagList';
import FormBottom from './FormBottom';

const style = require('./PostForm.scss');
const cx: ClassNamesFn = classNames.bind(style);

const PostForm = ({
  titleState,
  categoryState,
  tagInputState,
  postTagState,
  contentsState,
  onKeydownTagInput,
  handleFilterPostTag,
  handleIsModal,
  requestCreatePost,
}: PostFormProps): JSX.Element => {
  const { title, onChangeTitle } = titleState;
  const { onChangeCategory } = categoryState;
  const { contents, onChangeContents } = contentsState;
  const { postTags } = postTagState;
  const { tagInput, onChangeTagInput } = tagInputState;
  
  return (
    <div className={cx('PostForm')}>
      <TitleForm title={title} onChangeTitle={onChangeTitle} />

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
        requestCreatePost={requestCreatePost}
      />
    </div>
  );
};

export default memo(PostForm);
