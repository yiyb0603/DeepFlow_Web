import { ChangeEvent, MutableRefObject } from 'react';
import { useRecoilValue } from 'recoil';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import PreviewTab from '../PreviewTab';
import CommentInput from './CommentInput';
import { commentTabState } from 'atom/comment';
import { ECommentTab } from 'lib/enum/comment';
import CommentPreview from './CommentPreview';
import CommentSubmit from '../CommentSubmit';

const style = require('./CommentForm.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface CommentFormProps {
  contentsState: {
    contents: string;
    onChangeContents: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  };

  commentInputRef: MutableRefObject<HTMLTextAreaElement | null>;
  requestOfferComment: () => Promise<void>;
}

const CommentForm = ({
  contentsState,
  commentInputRef,
  requestOfferComment,
}: CommentFormProps): JSX.Element => {
  const { WRITE } = ECommentTab;
  const commentTab = useRecoilValue<ECommentTab>(commentTabState);

  return (
    <div className={cx('CommentForm')}>
      <PreviewTab />
      {
        commentTab === WRITE ?
        <CommentInput
          contentsState={contentsState}
          commentInputRef={commentInputRef}
        />
        :
        <CommentPreview contents={contentsState.contents} />
      }

      <CommentSubmit requestOfferComment={requestOfferComment} />
    </div>
  );
};

export default CommentForm;
