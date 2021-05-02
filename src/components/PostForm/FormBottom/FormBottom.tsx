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
        contents='임시저장'
        backgroundColor={palette.gray}
        onClick={() => requestOfferPost(true)}
      />
      
      <PostButton
        contents='작성하기'
        backgroundColor={palette.main}
        onClick={() => handleIsModal(true)}
      />
    </div>
  );
};

export default FormBottom;
