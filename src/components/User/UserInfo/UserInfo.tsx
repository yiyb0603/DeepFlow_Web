import { useEffect, memo, Fragment, useMemo, CSSProperties } from 'react';
import useUserInfo from 'hooks/user/useUserInfo';
import useViewMode from 'hooks/question/useViewMode';
import useUserPost from 'hooks/user/useUserPost';
import { EView } from 'lib/enum/theme';
import { IQuestion } from 'types/question.types';
import NoItems from 'components/Common/NoItems';
import ListItem from 'components/Common/Post/ListItem';
import UserLoading from 'components/UserList/UserLoading';
import Helmet from 'components/Common/Helmet';
import PageNumberList from 'components/Common/Post/PageNumberList';
import SelectViewMode from 'components/Common/Post/SelectViewMode';
import GridItem from 'components/Common/Post/GridItem';
import InfoBox from './InfoBox';
import PostTab from './PostTab';

const UserInfo = (): JSX.Element => {
  const {
    userInfo,
    requestUserInfo,
  } = useUserInfo();

  const {
    onChangeUserQuestionTab,
    userPostTab,
    splitedQuestionList,
    currentPage,
    onChangeCurrentPage,
    handlePrevPage,
    handleNextPage,
    numberListPage,
    splitedNumberList,
    requestUserPosts,
  } = useUserPost();

  const { viewMode, onChangeViewMode, flexStyle } = useViewMode();
  const customFlexStyle: CSSProperties = useMemo(() => {
    return {
      ...flexStyle,
      marginTop: '0.5rem',
    };
  }, [flexStyle]);

  useEffect(() => {
    requestUserInfo();
    requestUserPosts();
  }, [requestUserInfo, requestUserPosts]);

  return (
    <>
    {
      userInfo === null ? <UserLoading />
      :
      <>
        <Helmet title={`${userInfo.name} (${userInfo.githubId})`} />
        <InfoBox
          {...userInfo}
        />

        <PostTab
          userPostTab={userPostTab}
          onChangeUserQuestionTab={onChangeUserQuestionTab}
        />

        <SelectViewMode
          viewMode={viewMode}
          onChangeViewMode={onChangeViewMode}
          margin={'0.5rem 0 0 0'}
        />

        <div style={customFlexStyle}>
        {
          splitedQuestionList.length > 0 ? (
            splitedQuestionList[currentPage - 1] &&
            splitedQuestionList[currentPage - 1].map((question: IQuestion) => {
              return (
                <Fragment key={question.idx}>
                  {
                    viewMode === EView.LIST ?
                    <ListItem
                      {...question}
                    /> :
                    <GridItem
                      {...question}
                    />
                  }
                </Fragment>
              );
            })
          ) : <NoItems text='작성한 글 목록이 없습니다.' />
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
      </>
    }
    </>
  );
};

export default memo(UserInfo);