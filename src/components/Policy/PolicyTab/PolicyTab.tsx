import classNames from 'classnames';
import { ClassNamesFn } from 'classnames/types';
import { IPolicyTab, policyTabs } from 'lib/models/tabs/policyTabs';
import { EPolicy } from 'lib/enum/policy';
import SelectTab from 'components/Common/SelectTab';

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
        policyTabs.map(({ key, name, path }: IPolicyTab) => (
          <SelectTab
            key={key}
            name={name}
            route={path}
            selectTab={policyTab}
            onChangeSelectTab={onChangePolicyTab}
          />
        ))
      }
    </div>
  );
};

export default PolicyTab;
