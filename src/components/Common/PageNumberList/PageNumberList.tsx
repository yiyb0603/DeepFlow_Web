import { CSSProperties } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';

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
      <button
        className={cx('PageNumberList-Button')}
        style={visibilityStyle}
        onClick={handlePrevPage}
      >
        이전
      </button>
      
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
      
      <button
        className={cx('PageNumberList-Button')}
        style={visibilityStyle}
        onClick={handleNextPage}
      >
        다음
      </button>
    </div>
  );
};

export default PageNumberList;
