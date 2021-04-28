import { useEffect, useMemo, CSSProperties } from 'react';
import classNames from 'classnames';
import FadeIn from 'react-fade-in';
import usePosts from 'hooks/post/usePosts';
import useViewMode from 'hooks/post/useViewMode';
import { EView } from 'lib/enum/theme';
import { IPostTab, sortPostTabs } from 'lib/models/tabs/postTabs';
import { IPost } from 'types/post.types';
import Helmet from 'components/Common/Helmet';
import NoItems from 'components/Common/NoItems';
import PageNumberList from 'components/Common/Post/PageNumberList';
import PageTitle from 'components/Common/PageTitle';
import ListItem from 'components/Common/Post/ListItem';
import HomeLoading from 'components/Home/HomeLoading';
import SelectViewMode from 'components/Common/Post/SelectViewMode';
import GridItem from 'components/Common/Post/GridItem';
import SelectTab from 'components/Common/SelectTab';
import AskButton from './AskButton';
import { ClassNamesFn } from 'classnames/types';

const style = require('./Questions.scss');
const cx: ClassNamesFn = classNames.bind(style);

const Questions = (): JSX.Element => {
  const {
    postLoading,
    questionList,
    
    currentPage,
    onChangeCurrentPage,
    handlePrevPage,
    handleNextPage,

    numberListPage,
    splitedNumberList,

    sortTab,
    onChangeSortTab,

    requestPostList,
  } = usePosts();

  const { viewMode, onChangeViewMode, flexStyle } = useViewMode();

  const customTabStyle: CSSProperties = useMemo(() => {
    return {
      width: '4rem',
      border: 'none',
      textAlign: 'start',
      marginRight: '0.5rem',
    };
  }, []);

  useEffect(() => {
    requestPostList();
  }, [requestPostList, sortTab, currentPage]);

  return (
    <div className={cx('Questions')}>
    {
      postLoading && questionList.length <= 0 ? <HomeLoading />
      :
      <FadeIn>
        <Helmet title='질문 모음' />
        <PageTitle title='질문 모음' subTitle='질문 목록들이 여기에 표시됩니다.'>
          <AskButton />
        </PageTitle>

        <div className={cx('Questions-TabViewWrapper')}>
          <div className={cx('Questions-TabViewWrapper-Tab')}>
            {
              sortPostTabs.map(({ name, route }: IPostTab, idx: number) => (
                <SelectTab
                  key={idx}
                  name={name}
                  route={route}
                  selectTab={sortTab}
                  onChangeSelectTab={onChangeSortTab}
                  customStyle={customTabStyle}
                  type='Short'
                />
              ))
            }
          </div>

          <SelectViewMode
            viewMode={viewMode}
            onChangeViewMode={onChangeViewMode}
          />
        </div>

        <div style={flexStyle}>
          {
            questionList.length > 0 ? questionList.map((question: IPost) => {
              return (
                <>
                {
                  viewMode === EView.LIST ?
                  <ListItem
                    key={question.idx}
                    {...question}
                  /> :
                  <GridItem
                    key={question.idx}
                    {...question}
                  />
                }
                </>
              );
            }) : <NoItems text='작성된 글이 없습니다.' />
          }
        </div>

        <PageNumberList
          currentPage={currentPage}
          onChangeCurrentPage={onChangeCurrentPage}
          numberListPage={numberListPage}
          handlePrevPage={handlePrevPage}
          handleNextPage={handleNextPage}
          pageList={splitedNumberList}
        />
      </FadeIn>
    }
    </div>
  );
};

export default Questions;
