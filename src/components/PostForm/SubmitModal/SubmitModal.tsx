import { ChangeEvent, memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { palette } from 'styles/Palette/Palette';
import PostButton from 'components/Common/Post/PostButton';
import LoadingSpinner from 'components/Common/Loading/LoadingSpinner';
import SelectThumbnail from './SelectThumbnail';

const style = require('./SubmitModal.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface SubmitModalProps {
  title: string;

  introduction: string;
  onChangeIntroduction: (e: ChangeEvent<HTMLTextAreaElement>) => void;

  handleIsModal: (isModal: boolean) => void;
  isLoading: boolean;
  requestOfferPost: (isTemp: boolean) => Promise<void>;
}

const SubmitModal = ({
  title,
  introduction,
  onChangeIntroduction,
  handleIsModal,
  isLoading,
  requestOfferPost,
}: SubmitModalProps): JSX.Element => {
  return (
    <>
      <div className={cx('SubmitModal-Overlay')} onClick={() => handleIsModal(false)}></div>
      <div className={cx('SubmitModal')}>
        <div className={cx('SubmitModal-Wrapper')}>
          <SelectThumbnail />
          
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
                contents='취소'
                color={palette.gray}
                onClick={() => handleIsModal(false)}
              />
              
              <PostButton
                contents={isLoading ? <LoadingSpinner /> : '작성'}
                color={palette.main}
                onClick={() => requestOfferPost(false)}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(SubmitModal);
