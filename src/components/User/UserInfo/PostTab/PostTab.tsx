import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { EUserQuestion } from 'lib/enum/question';
import { userPostTabs } from 'lib/models/tabs/postTabs';
import SelectTab from 'components/Common/SelectTab';

const style = require('./PostTab.scss');
const cx: ClassNamesFn = classNames.bind(style);

export interface PostTabProps {
  userPostTab: EUserQuestion;
  onChangeUserQuestionTab: (userPostTab: EUserQuestion) => void;
};

const PostTab = ({
  userPostTab,
  onChangeUserQuestionTab,
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
            onChangeSelectTab={onChangeUserQuestionTab}
          />
        ))
      }
    </div>
  );
};

export default PostTab;
