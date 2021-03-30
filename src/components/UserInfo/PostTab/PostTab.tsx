import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { EUserPost } from 'lib/enum/post';
import { postTabs } from 'lib/models/postTabs';
import TabItem from './TabItem';

const style = require('./PostTab.scss');
const cx: ClassNamesFn = classNames.bind(style);

export interface PostTabProps {
  userPostTab: EUserPost;
  onChangeUserPostTab: (userPostTab: EUserPost) => void;
};

const PostTab = ({
  userPostTab,
  onChangeUserPostTab,
}: PostTabProps): JSX.Element => {
  return (
    <div className={cx('PostTab')}>
      {
        postTabs.map(({ name, route }, idx: number) => (
          <TabItem
            key={idx}
            name={name}
            route={route}
            userPostTab={userPostTab}
            onChangeUserPostTab={onChangeUserPostTab}
          />
        ))
      }
    </div>
  );
};

export default PostTab;
