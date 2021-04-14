import { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { History } from 'history';
import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { EPolicy } from 'lib/enum/policy';

const style = require('./PolicyTabItem.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface PolicyTabItemProps {
  tabKey: EPolicy;
  path: string;
  name: string;
  policyTab: EPolicy;
  onChangePolicyTab: (policyTab: EPolicy) => void;
}

const PolicyTabItem = ({
  tabKey,
  path,
  name,
  policyTab,
  onChangePolicyTab,
}: PolicyTabItemProps): JSX.Element => {
  const history: History = useHistory();

  const handlePushToPath = useCallback((): void => {
    onChangePolicyTab(tabKey);
    history.push(path);
  }, [history, onChangePolicyTab, path, tabKey]);
  
  return (
    <div
      className={cx('PolicyTabItem', {
        'PolicyTabItem-Selected': policyTab === tabKey,
      })}
      onClick={handlePushToPath}
    >
      {name}
    </div>
  );
};

export default PolicyTabItem;
