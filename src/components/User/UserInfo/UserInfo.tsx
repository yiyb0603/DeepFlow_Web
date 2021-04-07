import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import NoPosts from 'components/Common/NoPosts';
import ListItem from 'components/Common/Post/ListItem';
import { EUserPost } from 'lib/enum/post';
import { IPost } from 'types/post.types';
import { IUser } from 'types/user.types';
import InfoBox from './InfoBox';
import PostPageControl from './PostPageControl';
import PostTab from './PostTab';

const style = require('./UserInfo.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface UserInfoProps {
  userInfo: IUser;
  userPostTabState: {
    userPostTab: EUserPost;
    onChangeUserPostTab: (userPostTab: EUserPost) => void;
  };
  
  page: number;
  handlePrevPage: () => void;
  handleNextPage: () => void;

  splitedPostList: IPost[][];
}

const UserInfo = ({
  userInfo,
  userPostTabState,
  page,
  handlePrevPage,
  handleNextPage,
  splitedPostList,
}: UserInfoProps): JSX.Element => {
  const { avatar, githubId, name, email, description, position, location, blog } = userInfo;
  const { userPostTab, onChangeUserPostTab } = userPostTabState;

  return (
    <div className={cx('UserInfo')}>
      <InfoBox
        avatar={avatar}
        githubId={githubId}
        name={name}
        email={email}
        description={description}
        position={position}
        location={location}
        blog={blog}
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
        }) : <NoPosts text='작성한 글 목록이 없습니다.' />
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
  );
};

export default UserInfo;
