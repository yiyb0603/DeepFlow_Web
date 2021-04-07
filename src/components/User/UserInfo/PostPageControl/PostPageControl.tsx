import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

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
      
      <button
        onClick={handleNextPage}
        className={cx('PostPageControl-Button')}
      >
        다음
      </button>
    </div>
  );
};

export default PostPageControl;
