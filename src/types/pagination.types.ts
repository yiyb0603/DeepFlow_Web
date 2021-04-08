export interface IPagination {
  totalPage?: number;
  
  currentPageState: {
    currentPage: number;
    onChangeCurrentPage: (currentPage: number) => void;
  };
  
  handlePrevPage: () => void;
  handleNextPage: () => void;
  numberListPage: number;
  splitedNumberList: number[][];
}