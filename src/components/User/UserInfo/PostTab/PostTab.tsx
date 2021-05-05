import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { EUserQuestion } from 'lib/enum/question';
import { userPostTabs } from 'lib/models/tabs/postTabs';
import SelectTab from 'components/Common/SelectTab';

const style = require('./PostTab.scss');
const cx: ClassNamesFn = classNames.bind(style);

export interface PostTabProps {
  userPostTab: EUserQuestion;
  onChangEUserQuestionTab: (userPostTab: EUserQuestion) => void;
};

const PostTab = ({
  userPostTab,
  onChangEUserQuestionTab,
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
            onChangeSelectTab={onChangEUserQuestionTab}
          />
        ))
      }
    </div>
  );
};

export default PostTab;
