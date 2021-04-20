import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import Button from 'components/Common/Button';
import { palette } from 'styles/Palette/Palette';

const style = require('./PostPageControl.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface PostPageControlProps {
  page: number;
  postLength: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
}

const PostPageControl = ({
  page,
  postLength,
  handlePrevPage,
  handleNextPage,
}: PostPageControlProps): JSX.Element => {
  return (
    <div className={cx('PostPageControl')}>
      <Button
        color={palette.main}
        onClick={handlePrevPage}
        padding={'1rem 2rem'}
      >
        이전
      </Button>
      <button
        onClick={handlePrevPage}
        className={cx('PostPageControl-Button')}
      >
        이전
      </button>
      
      <div className={cx('PostPageControl-Page')}>
        {
          page + '/' + postLength
        }
      </div>
      
      <Button
        color={palette.main}
        onClick={handleNextPage}
        padding={'1rem 2rem'}
      >
        이전
      </Button>
    </div>
  );
};

export default PostPageControl;
