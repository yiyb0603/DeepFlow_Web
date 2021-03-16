import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { EPost } from 'lib/enum/post';
import SelectCategory from '../SelectCategory';

const style = require('./PostSubmit.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface PostSubmitProps {
  onChangeCategory: (category: EPost) => void;
  requestCreatePost: (isTemp: boolean) => Promise<void>;
}

const PostSubmit = ({ onChangeCategory, requestCreatePost }: PostSubmitProps): JSX.Element => {
  return (
    <div className={cx('PostSubmit')}>
      <SelectCategory onChangeCategory={onChangeCategory} />

      <div className={cx('PostSubmit-Wrapper')}>
        <button
          className={cx('PostSubmit-Wrapper-Save')}
          onClick={() => requestCreatePost(true)}
        >
          임시저장
        </button>
        
        <button
          className={cx('PostSubmit-Wrapper-Submit')}
          onClick={() => requestCreatePost(false)}
        >
          출간하기
        </button>
      </div>
    </div>
  );
};

export default PostSubmit;
