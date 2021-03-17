import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import PostButton from 'components/Common/Post/PostButton';
import { EPost } from 'lib/enum/post';
import SelectCategory from '../SelectCategory';

const style = require('./FormBottom.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface FormBottomProps {
  handleIsModal: (isModal: boolean) => void;
  onChangeCategory: (category: EPost) => void;
  requestCreatePost: (isTemp: boolean) => Promise<void>;
}

const FormBottom = ({
  handleIsModal,
  onChangeCategory,
  requestCreatePost
}: FormBottomProps): JSX.Element => {
  return (
    <div className={cx('FormBottom')}>
      <SelectCategory onChangeCategory={onChangeCategory} />

      <div className={cx('FormBottom-Wrapper')}>
        <PostButton
          text='임시저장'
          color='Gray'
          onClick={() => requestCreatePost(true)}
        />
        
        <PostButton
          text='출간하기'
          color='Blue'
          onClick={() => handleIsModal(true)}
        />
          
      </div>
    </div>
  );
};

export default FormBottom;
