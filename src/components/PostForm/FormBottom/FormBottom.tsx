import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import PostButton from 'components/Common/Post/PostButton';
import { palette } from 'styles/Palette/Palette';

const style = require('./FormBottom.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface FormBottomProps {
  handleIsModal: (isModal: boolean) => void;
  requestOfferPost: (isTemp: boolean) => Promise<void>;
}

const FormBottom = ({
  handleIsModal,
  requestOfferPost,
}: FormBottomProps): JSX.Element => {
  return (
    <div className={cx('FormBottom')}>
      <PostButton
        text='임시저장'
        color={palette.gray}
        onClick={() => requestOfferPost(true)}
      />
      
      <PostButton
        text='작성하기'
        color={palette.main}
        onClick={() => handleIsModal(true)}
      />
    </div>
  );
};

export default FormBottom;
