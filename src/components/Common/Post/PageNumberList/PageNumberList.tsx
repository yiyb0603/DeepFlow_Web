import { CSSProperties, memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import Button from 'components/Common/Button';
import palette from 'styles/palette';
import PageNumberItem from './PageNumberItem';

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
        backgroundColor={palette.main}
        customStyle={visibilityStyle}
        handleClick={handlePrevPage}
        padding='0 1rem'
      >
        이전
      </Button>
      
      <div className={cx('PageNumberList-Pages')}>
        {
          pageList[numberListPage - 1] &&
          pageList[numberListPage - 1].map((page: number, idx: number) => (
            <PageNumberItem
              key={idx}
              page={page}
              currentPage={currentPage}
              onChangeCurrentPage={onChangeCurrentPage}
            />
          ))
        }
      </div>
      
      <Button
        backgroundColor={palette.main}
        customStyle={visibilityStyle}
        handleClick={handleNextPage}
        padding='0 1rem'
      >
        다음
      </Button>
    </div>
  );
};

export default memo(PageNumberList);
