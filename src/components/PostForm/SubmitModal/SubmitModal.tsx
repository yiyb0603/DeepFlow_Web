import { ChangeEvent, memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import PostButton from 'components/Common/Post/PostButton';
import SelectThumbnail from './SelectThumbnail';

const style = require('./SubmitModal.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface SubmitModalProps {
  title: string;
  introductionState: {
    introduction: string;
    onChangeIntroduction: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  };

  thumbnailState: {
    thumbnail: string;
    onChangeThumbnail: (e: ChangeEvent<HTMLInputElement>) => Promise<void>;
  };

  handleIsModal: (isModal: boolean) => void;
  requestCreatePost: (isTemp: boolean) => Promise<void>;
}

const SubmitModal = ({
  title,
  introductionState,
  thumbnailState,
  handleIsModal,
  requestCreatePost,
}: SubmitModalProps): JSX.Element => {
  const { thumbnail, onChangeThumbnail } = thumbnailState;
  const { introduction, onChangeIntroduction } = introductionState;

  return (
    <>
      <div className={cx('SubmitModal-Overlay')} onClick={() => handleIsModal(false)}></div>
      <div className={cx('SubmitModal')}>
        <div className={cx('SubmitModal-Wrapper')}>
          <SelectThumbnail thumbnail={thumbnail} onChangeThumbnail={onChangeThumbnail} />
          
          <div className={cx('SubmitModal-Wrapper-Contents')}>
            <div className={cx('SubmitModal-Wrapper-Contents-Title')}>
              제목: {title}
            </div>
            <textarea
              className={cx('SubmitModal-Wrapper-Contents-Introduction')}
              value={introduction}
              onChange={onChangeIntroduction}
              placeholder='소개글을 작성하세요.'
            ></textarea>

            <div className={cx('SubmitModal-Wrapper-Contents-Buttons')}>
              <PostButton
                text='취소'
                color='Gray'
                onClick={() => handleIsModal(false)}
              />
              
              <PostButton
                text='작성'
                color='Blue'
                onClick={() => requestCreatePost(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(SubmitModal);
