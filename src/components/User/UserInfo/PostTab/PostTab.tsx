import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { EUserPost } from 'lib/enum/post';
import { userPostTabs } from 'lib/models/tabs/postTabs';
import SelectTab from 'components/Common/SelectTab';

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
        userPostTabs.map(({ name, route }, idx: number) => (
          <SelectTab
            key={idx}
            name={name}
            route={route}
            selectTab={userPostTab}
            onChangeSelectTab={onChangeUserPostTab}
          />
        ))
      }
    </div>
  );
};

export default PostTab;
