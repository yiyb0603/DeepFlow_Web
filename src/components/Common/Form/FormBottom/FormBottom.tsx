import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { palette } from 'styles/Palette/Palette';
import PostButton from 'components/Common/Post/PostButton';

const style = require('./FormBottom.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface FormBottomProps {
  onSave?: () => void;
  onWrite: () => void;
}

const FormBottom = ({
  onSave,
  onWrite,
}: FormBottomProps): JSX.Element => {
  return (
    <div className={cx('FormBottom')}>
      {
        typeof onSave === 'function' &&
        <PostButton
          contents='임시저장'
          backgroundColor={palette.gray}
          onClick={onSave}
        />
      }
      
      <PostButton
        contents='작성하기'
        backgroundColor={palette.main}
        onClick={onWrite}
      />
    </div>
  );
};

export default FormBottom;
