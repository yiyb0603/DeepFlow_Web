import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { IPolicyTab, policyTabs } from 'lib/models/tabs/policyTabs';
import { EPolicy } from 'lib/enum/policy';
import PolicyTabItem from './PolicyTabItem';

const style = require('./PolicyTab.scss');
const cx: ClassNamesFn = classNames.bind(style);

interface PolicyTabProps {
  policyTab: EPolicy;
  onChangePolicyTab: (policyTab: EPolicy) => void;
}

const PolicyTab = ({
  policyTab,
  onChangePolicyTab,
}: PolicyTabProps): JSX.Element => {
  return (
    <div className={cx('PolicyTab')}>
      {
        policyTabs.map(({ key, name, path }: IPolicyTab, idx: number) => (
          <PolicyTabItem
            key={idx}
            tabKey={key}
            name={name}
            path={path}
            policyTab={policyTab}
            onChangePolicyTab={onChangePolicyTab}
          />
        ))
      }
    </div>
  );
};

export default PolicyTab;
