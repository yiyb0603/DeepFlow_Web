import { CSSProperties, memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import Button from 'components/Common/Button';
import { palette } from 'styles/Palette/Palette';

const style = require('./PageNumberList.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface PageNumberListProps {
  currentPage: number;
  onChangeCurrentPage: (page: number) => void;

  numberListPage: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;
  pageList: number[][];
}

const PageNumberList = ({
  pageList,
  numberListPage,
  currentPage,
  handlePrevPage,
  handleNextPage,
  onChangeCurrentPage,
}: PageNumberListProps) => {
  const visibilityStyle: CSSProperties = {
    visibility: pageList.length > 1 ? 'unset' : 'hidden',
  }

  return (
    <div className={cx('PageNumberList')}>
      <Button
        color={palette.main}
        customStyle={visibilityStyle}
        onClick={handlePrevPage}
        padding={'1rem'}
      >
        이전
      </Button>
      
      <div className={cx('PageNumberList-Pages')}>
        {
          pageList[numberListPage - 1] &&
          pageList[numberListPage - 1].map((page: number, idx: number) => (
            <div
              key={idx}
              className={cx('PageNumberList-Pages-Page', {
                'PageNumberList-Pages-Page-Current': page === currentPage,
              })}
              onClick={() => onChangeCurrentPage(page)}
            >
              {page}
            </div>
          ))
        }
      </div>
      
      <Button
        color={palette.main}
        customStyle={visibilityStyle}
        onClick={handleNextPage}
        padding={'1rem'}
      >
        이전
      </Button>
    </div>
  );
};

export default memo(PageNumberList);
