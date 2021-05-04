import { useEffect, memo } from 'react';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import useUserInfo from 'hooks/user/useUserInfo';
import { IQuestion } from 'types/question.types';
import NoItems from 'components/Common/NoItems';
import ListItem from 'components/Common/Post/ListItem';
import UserLoading from 'components/UserList/UserLoading';
import Helmet from 'components/Common/Helmet';
import PageNumberList from 'components/Common/Post/PageNumberList';
import InfoBox from './InfoBox';
import PostTab from './PostTab';

const style = require('./UserInfo.scss');
const cx: ClassNamesFn = classNames.bind(style);

const UserInfo = (): JSX.Element => {
  const {
    userInfo,
    setUserInfo,
    onChangeUserPostTab,
    userPostTab,
    renderUserInfo,
    splitedQuestionList,
    currentPage,
    onChangeCurrentPage,
    handlePrevPage,
    handleNextPage,
    numberListPage,
    splitedNumberList,
  } = useUserInfo();

  useEffect(() => {
    renderUserInfo();

    return () => {
      setUserInfo(null);
    }
  }, [renderUserInfo, setUserInfo]);

  return (
    <>
    {
      userInfo === null ? <UserLoading />
      :
      <div className={cx('UserInfo')}>
        <Helmet title={`${userInfo.name} (${userInfo.githubId})`} />
        <InfoBox
          {...userInfo}
        />

        <PostTab
          userPostTab={userPostTab}
          onChangeUserPostTab={onChangeUserPostTab}
        />

        <div className={cx('UserInfo-PostList')}>
        {
          splitedQuestionList.length > 0 ? (
            splitedQuestionList[currentPage - 1] &&
            splitedQuestionList[currentPage - 1].map((question: IQuestion) => {
              return (
                <ListItem
                  key={question.idx}
                  {...question}
                />
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
      </div>
    }
    </>
  );
};

export default memo(UserInfo);