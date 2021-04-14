import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import useUserInfo from 'hooks/user/useUserInfo';
import { IPost } from 'types/post.types';
import NoItems from 'components/Common/NoItems';
import ListItem from 'components/Common/Post/ListItem';
import UserLoading from 'components/UserList/UserLoading';
import Helmet from 'components/Common/Helmet';
import InfoBox from './InfoBox';
import PostPageControl from './PostPageControl';
import PostTab from './PostTab';

const style = require('./UserInfo.scss');
const cx: ClassNamesFn = classNames.bind(style);

const UserInfo = (): JSX.Element => {
  const {
    userInfo,
    onChangeUserPostTab,
    handlePrevPage,
    handleNextPage,
    userPostTab,
    page,
    splitedPostList,
  } = useUserInfo();

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
          splitedPostList.length > 0 ?
          splitedPostList[page - 1].map((post: IPost) => {
            return (
              <ListItem
                key={post.idx}
                {...post}
              />
            );
          }) : <NoItems text='작성한 글 목록이 없습니다.' />
        }
        </div>

        {
          splitedPostList.length > 1 &&
          <PostPageControl
            page={page}
            postLength={splitedPostList.length}
            handlePrevPage={handlePrevPage}
            handleNextPage={handleNextPage}
          />
        }
      </div>
    }
    </>
  );
};

export default UserInfo;
