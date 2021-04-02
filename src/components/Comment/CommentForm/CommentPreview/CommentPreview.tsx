import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import MarkdownRender from 'components/Common/Markdown/MarkdownRender';

const style = require('./CommentPreview.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface CommentPreviewProps {
  contents: string;
}

const CommentPreview = ({
  contents,
}: CommentPreviewProps): JSX.Element => {
  return (
    <div className={cx('CommentPreview')}>
      <MarkdownRender contents={contents} />
    </div>
  );
};

export default CommentPreview;
