import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import MarkdownForm from 'components/Common/Markdown/MarkdownForm';
import PostFormProps from './PostForm.props';
import SelectCategory from './SelectCategory';
import TagForm from './TagForm';
import TitleForm from './TitleForm';

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
}: PostFormProps): JSX.Element => {
  const { contents, onChangeContents } = contentsState;
  
  return (
    <div className={cx('PostForm')}>
      <TitleForm title={titleState.title} onChangeTitle={titleState.onChangeTitle} />

      <div className={cx('PostForm-CategoryTagWrapper')}>
        <SelectCategory onChangeCategory={categoryState.onChangeCategory} />
        <TagForm
          postTags={postTagState.postTags}
          tagInput={tagInputState.tagInput}
          onChangeTagInput={tagInputState.onChangeTagInput}
          onKeydownTagInput={onKeydownTagInput}
          handleFilterPostTag={handleFilterPostTag}
        />
      </div>

      <MarkdownForm
        contents={contents}
        onChangeContents={onChangeContents}
      />
    </div>
  );
};

export default PostForm;
